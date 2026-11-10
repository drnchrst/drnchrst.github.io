# Dareen Christabel — Portfolio

A static portfolio website showcasing Dareen Christabel's background and UX research and product development projects. It is built with HTML, CSS, and JavaScript, with images stored in `images/`. The root files are the GitHub Pages site; see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) for its design and case study conventions.

The former `contact.html` and `boosting-repayment.html` URLs redirect to their current pages. The previous site is available in Git history.

## Run locally

There is no build step. From the project root, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Localize hosted images

`localize_assets.py` downloads images referenced from Webflow's CDN and updates the HTML to use the local files. Run it with `python3 localize_assets.py`; it requires an internet connection. Review the resulting changes before committing.
