
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home - HHE Blog</title>
</head>
<body>

    <div class="container">
        <header>
            <h1>Welcome to My Blog!</h1>
            <p>공부 기록용의 HHE blog입니다.</p>
        </header>

        <section id="about-blog">
            <h2>About this Blog</h2>
            <p>This blog covers a variety of subjects, including:</p>
            <ul>
                <li><strong>Basic CS study</strong>: OS / NetWork / DataBase etc ..</li>
                <li><strong>Programming study</strong>: AOS / SpringBOOT 개발 공부</li>
                <li><strong>Artificial Intelligence</strong>: 인공지능 논문 리뷰</li>
            </ul>
        </section>

        <section id="about-me">
            <h2>About Me</h2>
            <p>I'm a Student with a passion for coding. I enjoy sharing knowledge and building projects. Thanks.</p>
            <p>
                <a href="https://github.com/hhe5361" target="_blank">GitHub</a>
            </p>
        </section>

        <section id="my-posts">
            <h2>My Posts</h2>
            <ul>
                {% for post in site.posts %}
                    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
                {% endfor %}
            </ul>
        </section>

        <footer>
            <p>&copy; 2024 HHE Blog. All rights reserved.</p>
        </footer>
    </div>

</body>
</html>
