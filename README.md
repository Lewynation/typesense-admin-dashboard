# Typesense admin dashboard

![Typesense admin dashboard](apps/website_dashboard/public/og.png)

Welcome to the Typesense Admin Dashboard GitHub repository! This open-source project provides a user-friendly interface to manage your Typesense search engine effortlessly. It is built using [Turborepo](https://turbo.build/repo/docs/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [redux-toolkit](https://redux-toolkit.js.org/), [Shadcn](https://ui.shadcn.com/) and [Typesense](https://typesense.org/).

It is still in active development and we are working on polishing,finetuning and adding more features. If you have any feedback or suggestions, please feel free to
[open an issue](https://github.com/Lewynation/typesense-admin-dashboard/issues)

## Features

- **Intuitive Search Management**: Easily configure collections, define schema fields, and fine-tune search settings with a clean and intuitive interface.
- **Real-time Monitoring**: Gain valuable insights into your search engine's performance, query analytics, and indexing status, enabling you to optimize and improve search results.
- **User Management**: Control access and permissions for multiple users, allowing collaborative search engine management within your organization. `(Coming soon)`
- **Indexing and Data Import**: Seamlessly index and import data from various sources, ensuring your search engine is always up-to-date. `(Coming soon)`
- **Advanced Settings**: Fine-tune advanced search features, tokenization, ranking, and sorting parameters to customize the search experience. `(Coming soon)`

## Getting Started

### Using Docker compose

The project contains two docker compose files at the root of the appliation:

- [`docker-compose.yml`](./docker-compose.yml) : Runs the dashboard alongside the typesense server. Exposes the dashboard on port `3000` and typesense on port `8108`. Perfect for development or just trying out the dashboard. Provide a suitable typesense server API Key by modifying the `--api-key` flag in the entrypoint of the `typesense` service. Ensure that cors is enabled on the typesense server with the `--enable-cors` flag. Typesense does not have a latest tag on the Docker Hub. You can find a list of all available tags [here](https://hub.docker.com/r/typesense/typesense/tags). The dashboard as well doesn't have a latest tag. Check the latest version [here](https://github.com/Lewynation/typesense-admin-dashboard/pkgs/container/typesense-admin-dashboard).
- [`docker-compose-solo.yml`](./docker-compose-solo.yml) : Only runs the admin dashboard. A running instance of typesense with `--enable-cors` set to `true` is required. Exposes the dashboard on port `3005`. Check the latest version of the dashboard [here](https://github.com/Lewynation/typesense-admin-dashboard/pkgs/container/typesense-admin-dashboard).

## Useful Links

- [Typesense](https://typesense.org/)
- [Existing dashboard](https://bfritscher.github.io/typesense-dashboard/#)
