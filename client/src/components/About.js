import React from "react";

function About() {
    return (
        <div className="container mt-5">
            <h2>About This App</h2>
            <p>This is a simple Todo application built with React, Node.js, and MongoDB.</p>
            <p>Features:</p>
            <ul>
                <li>User authentication (signup and login)</li>
                <li>Create, read, update, and delete todos</li>
                <li>Filter todos by completion status</li>
                <li>Responsive design using Bootstrap</li>
            </ul>
            <p>Source code available on GitHub.</p>
            <p className="text-muted">You can add multiple todos and delete them as needed.</p>
            <p className="text-muted">Todos are stored in a MongoDB database and managed through a Node.js backend.</p>
            <p className="text-muted">Make sure to have the backend running to interact with the database.</p>
            <p className="text-muted">This app uses JWT for authentication, so please log in first.</p>
            <p className="text-muted">If you are not logged in, you will be redirected to the login page.</p>
            <p className="text-muted">Enjoy managing your todos!</p>
            <p className="text-muted">You can also check the console for any errors or logs.</p>
            <p className="text-muted">Feel free to customize the styles and layout as per your needs.</p>
            <p className="text-muted">This app is built with React, Bootstrap, and Axios.</p>
            <p className="text-muted">
                If you have any questions or suggestions, feel free to reach out.
            </p>
            <p className="text-muted">Happy coding!</p>
            <p className="text-muted">Remember to keep your todos organized and up to date.</p>
            <p className="text-muted">You can also add due dates or priorities to your todos for better management.</p>
            <p className="text-muted">This app is a great starting point for building more complex applications.</p>
            <p className="text-muted">You can extend its functionality by adding features like editing todos, marking them as completed, or categorizing them.</p>
            <p className="text-muted">Feel free to explore and enhance this app as per your requirements.</p>
            <p className="text-muted">Don't forget to check out the backend code for more insights on how the API works.</p>
        </div>
    );
}

export default About;