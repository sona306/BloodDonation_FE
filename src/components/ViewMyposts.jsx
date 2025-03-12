import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewMyPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    // ✅ Fetch the admin's posts
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

    // ✅ Delete a post
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
        <div className="view-my-posts">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h3 className="fw-bold display-5 text-gradient">📝 My Posts</h3>
                </div>

                {/* ✅ Display posts */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="col">
                                <div className="card shadow-lg glass-card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-dark fw-bold mb-3">
                                            {post.Message}
                                        </h5>
                                        <p className="card-text text-muted">
                                            Posted on {new Date(post.postedDate).toLocaleDateString()}
                                        </p>
                                        
                                        {/* ✅ Delete Button */}
                                        <button 
                                            className="btn btn-danger rounded-pill mt-auto fw-bold px-4 py-2"
                                            onClick={() => deletePost(post._id)}
                                        >
                                            ❌ Delete Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p className="text-muted fs-5">No posts available</p>
                        </div>
                    )}
                </div>

                {/* ✅ Back Button */}
                <div className="text-center mt-5">
                    <button 
                        className="btn btn-outline-light shadow-sm rounded-pill px-5 py-2 fw-bold"
                        onClick={() => navigate('/admin')}
                    >
                        ⬅️ Back to Admin Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewMyPosts;
