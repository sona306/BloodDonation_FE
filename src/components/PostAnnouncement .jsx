import axios from 'axios';
import React, { useState } from 'react';

const PostAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear previous messages
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/admin/postAnnouncement', {
                title,
                content,
            }, {
                headers: {
                    "token": sessionStorage.getItem("token"), // Assuming you store the token in sessionStorage
                    "Content-Type": "application/json"
                }
            });

            // Set success message
            setMessage(response.data.message);
            // Optionally reset the form
            setTitle('');
            setContent('');
        } catch (err) {
            console.error("Error creating post:", err);
            setError("Failed to create post. Please try again.");
        }
    };

    return (
        <div className="container">
            <h3>Create Announcement</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default PostAnnouncement;