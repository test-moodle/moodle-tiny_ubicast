# Makefile.
DOCKER_IMAGE_NAME ?= tiny_ubicast
DOCKER_PLUGIN_DIR = /opt/moodle/lib/editor/tiny/plugins/ubicast

zip:
	# Build zip file for moodle.org with last commit.
	git archive HEAD --prefix="ubicast/" --format=zip -o "tiny_ubicast.zip"

build:
	docker build -t ${DOCKER_IMAGE_NAME} .

rebuild:
	docker build --no-cache -t ${DOCKER_IMAGE_NAME} .

push:
	docker push ${DOCKER_IMAGE_NAME}

lint:
	docker run -ti --rm -v ${CURDIR}:${DOCKER_PLUGIN_DIR} ${DOCKER_IMAGE_NAME} grunt eslint --show-lint-warnings

js:
	docker run -ti --rm -v ${CURDIR}:${DOCKER_PLUGIN_DIR} ${DOCKER_IMAGE_NAME} grunt js

shell:
	docker run -ti --rm -v ${CURDIR}:${DOCKER_PLUGIN_DIR} ${DOCKER_IMAGE_NAME} sh
