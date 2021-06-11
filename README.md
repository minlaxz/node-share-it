Image file sharing using NodeJS

- Setup

  1. Clone this repository
  2. `cd` to cloned repository
  3. `docker built -t minlaxz/node_share_it .`

OR

You can directly pull from github packages like

- `docker pull ghcr.io/minlaxz/node-share-it:latest`

- Run
  ```
     docker run --name share_to_this -d \
     -p 5500:3000 -v $HOME/windows_shared/image_uploads:/usr/src/app/uploads \
     --cpus=".5" --memory="512m" --restart unless-stopped \
     minlaxz/node_share_it
  ```


- Check your port @ 5500