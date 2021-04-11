FROM phusion/baseimage:focal-1.0.0alpha1-amd64

# Set ENV Vars
ENV APP_HOME=/home/app
ENV PIPENV_VENV_IN_PROJECT=1
ENV PIPENV_DONT_LOAD_ENV=1
ENV PYENV_ROOT $APP_HOME/.pyenv
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH

# Setup node js and yarn repos
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install Apt dependencies
RUN install_clean gettext postgresql-client python3 python3-dev python3-gdal python3-setuptools python3-wheel python3-pip python3-venv nginx htop less gpg software-properties-common tmux nodejs yarn locales wget git curl zip vim apt-transport-https tzdata language-pack-nb language-pack-nb-base manpages build-essential libjpeg-dev libssl-dev zlib1g-dev libbz2-dev libreadline-dev libreadline6-dev libsqlite3-dev tk-dev libffi-dev libpng-dev libfreetype6-dev memcached libmemcached-tools

# Create the app user
RUN useradd -ms /bin/bash app && usermod -aG www-data app

USER app

WORKDIR $APP_HOME

# Setup pyenv with version 3.9.0 and install some dependencies
RUN git clone https://github.com/pyenv/pyenv.git ${APP_HOME}/.pyenv && pyenv install 3.9.0 && pyenv global 3.9.0 && pip3 install --upgrade uwsgi pipenv

# Install application backend deps
# Note that we copy Pipfile from the server directory to the root directory.
# This is so that the virtual environment that is created there is not
# overwritten when mounting the server volume in docker-compose.
# This means that there are 2 copies of the Pipfile; it is the one in
# $APP_HOME and _not_ $APP_HOME/server that is used.
COPY --chown=app:app ./server/Pipfile* $APP_HOME/
RUN cd $APP_HOME && pipenv install --dev

# Start backend dev server
COPY --chown=root:root run-server.sh /etc/service/server/run

# Copy the base nginx config
COPY --chown=root:root nginx.conf /etc/nginx/nginx.conf
COPY --chown=root:root run-nginx.sh /etc/service/nginx/run

# necessary to have permission to remove nginx support
USER root
RUN rm -rf /etc/service/nginx
