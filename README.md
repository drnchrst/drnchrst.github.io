# Dareen Christabel — Portfolio

A static portfolio website showcasing Dareen Christabel's background and UX research and product development projects. It is built with HTML and CSS, with images stored in `images/`.

## Run locally

There is no build step. From the project root, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Localize hosted images

`localize_assets.py` downloads images referenced from Webflow's CDN and updates the HTML to use the local files. Run it with `python3 localize_assets.py`; it requires an internet connection. Review the resulting changes before committing.
