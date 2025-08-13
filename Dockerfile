FROM node:lts-bookworm

RUN mkdir /src

COPY ./ /src/

WORKDIR /src

RUN apt-get update -qq \
  && apt-get upgrade -y \
  && apt-get clean autoclean \
  && apt-get autoremove -y \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

CMD [ "node", "." ]
