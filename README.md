# Website repository

This repository contains all the code and content necessary for my website. 
The original code for the website relies on the [Ed](http://minicomp.github.io/ed) theme and is available [here](https://github.com/minicomp/ed).
The code was modified mostly to remove the sidebar and instead place the links at the top of the page.



## Ed

[Ed](http://minicomp.github.io/ed) is a [Jekyll](https://jekyllrb.com/) theme designed for textual editors based on [minimal computing](http://go-dh.github.io/mincomp/) principles, and focused on legibility, durability, ease and flexibility. To learn how to install and begin using Ed, please visit the [documentation page](http://minicomp.github.io/ed/documentation).





## Folders structure


- `assets` contains several folders
    - `PDFs` contains my CV and the PDFs versions of all my papers.
    - `Slides` contains all the presentations associated with conference papers.
    - `blog_posts` contains the blog posts written for this website.
    - `paper_pics` contains all the pictures used to illustrate my papers.
    - `gifs` contains all the gifs displayed in the website.
    - `logos` contains logos of universities, companies and conferences I attended.
    - `js` contains file `chart.js` that creates the citations histogram in the *Publications* page based on data scraped from Google Scholar with the Python code `Google_scholar_metrics.py`.
- `_includes` contains file `head.html` gathering settings for the metadata.
- `_layouts` contains files `page.html` and `default.html` describing the page layouts.
- `_sass` contains files `_ed.scss` and `_syntax.scss` controlling the style of the website.


## Files structure

- `404.md` is the code to generate the error 404 message when a page is not found.
- `Blog.html` is the code to generate the *Blog* page of the website.
- `index.html` is the code to generate the *About* page of the website. 
- `LICENSE.md` is the license of the [original GitHub repository](https://github.com/minicomp/ed).
- `Publications.html` is the code to generate the *Publications* page of the website.
- `Research.html` is the code to generate the *Research* page of the website.
- `Resume.html` is the code to generate the *Resume* page of the website.
- `Teaching.html` is the code to generate the *Teaching* page of the website.
- `_config.yml` gathers some high level information for the website.




