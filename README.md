# abhinav0821.github.io

Personal portfolio of Abhinav Kashyap — live at **https://abhinav0821.github.io/**

Plain HTML/CSS/JS, no build step.

```
index.html            all content
assets/css/style.css  styles (dark/light theme tokens at the top)
assets/js/main.js     theme toggle, scroll-spy nav, project filters, reveal animations
assets/favicon.svg
assets/Abhinav_Kashyap_Resume.pdf   <- drop your latest résumé here
```

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (GitHub Pages)
1. Create a public repo named exactly `Abhinav0821.github.io`.
2. Push this folder to its `main` branch.
3. Repo → Settings → Pages → Source: "Deploy from a branch", `main` / `(root)`.
