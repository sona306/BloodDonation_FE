import React from 'react'

const Navbarlogin = () => {
    return (
        <div>

<nav class="navbar navbar-expand-lg bg-info">
<br></br><br></br><br></br>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">" LifeSaver: A Comprehensive Blood Donation and Blood
                    Bank Finder Platform"</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                            <li><a class="nav-link active" href="/donarsignin">Donors</a></li>
                            </li>
                            <li class="nav-item">
                            <li><a class="nav-link active" href="/consumersignin">Consumers</a></li>
                            </li>
                            <li class="nav-item">
                            <li><a class="nav-link active" href="/adminsignin">Admin</a></li>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbarlogin