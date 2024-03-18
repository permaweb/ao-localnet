FROM ubuntu as builder
ARG ARDRIVE_WEB_VERSION=v2.37.2
ARG FLUTTER_VERSION=3.19.2

RUN apt update && apt install --yes curl git unzip

WORKDIR /src
ENV PATH="/root/.pub-cache/bin:/src/flutter/bin:${PATH}"

RUN git clone --branch=${FLUTTER_VERSION} --depth=1 https://github.com/flutter/flutter.git
RUN git clone --branch=${ARDRIVE_WEB_VERSION} --depth=1 https://github.com/ardriveapp/ardrive-web.git

WORKDIR /src/ardrive-web

# TODO: TEMP: remove this after #12 is fixed 
RUN grep -rl v3.8.3 . | xargs sed -i 's/v3\.8\.3/v3.8.4/g'
RUN grep -rl 41d590687cecafc316b3c83da20274a29d3e2833 . | xargs sed -i 's/41d590687cecafc316b3c83da20274a29d3e2833/3ecb130df71e0ee9d2fdb44913ac49aaa47b3fd7/g'

RUN flutter --version
RUN flutter pub global activate script_runner
RUN scr setup
RUN flutter config --enable-web
RUN flutter build web --dart-define=environment=development

FROM httpd:alpine
COPY --from=builder /src/ardrive-web/build/web /usr/local/apache2/htdocs/
