import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewMyPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    // Fetch the admin's posts
    const fetchPosts = () => {
        axios.post("http://localhost:8080/admin/viewmypost", 
        { adminId: sessionStorage.getItem("adminId") }, 
        {
            headers: {
                "token": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.data && response.data.status !== "Error") {
                setPosts(response.data);
            } else {
                alert("Error fetching posts.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // Delete a post
    const deletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            axios.post("http://localhost:8080/admin/deletepost", 
            { postId: postId }, 
            {
                headers: {
                    "token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if (response.data.status === "Success") {
                    alert("Post deleted successfully");
                    setPosts(posts.filter(post => post._id !== postId)); // Remove post from UI
                } else {
                    alert("Failed to delete post");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">My Posts</h3>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {posts.length > 0 ? posts.map((post, index) => (
                    <div key={index} className="col">
                        <div className="card shadow-sm border-primary h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{post.Message}</h5>
                                <p className="card-text">
                                    <small className="text-muted">Posted on {new Date(post.postedDate).toLocaleDateString()}</small>
                                </p>
                                <button 
                                    className="btn btn-danger mt-auto" 
                                    onClick={() => deletePost(post._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center">No posts available</p>}
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Back to Admin Page</button>
            </div>
        </div>
    );
};

export default ViewMyPosts;
