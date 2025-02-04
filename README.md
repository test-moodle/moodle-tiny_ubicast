# moodle-tiny_ubicast

Moodle plugin for inserting Nudgis content into HTML text areas

## Requirements

* Moodle 4.4+
* mod_ubicast (mandatory): https://github.com/UbiCastTeam/moodle-mod_ubicast
* filter_ubicast (optional, to allow students to insert video content in assignments or forums): https://github.com/UbiCastTeam/moodle-filter_ubicast

## Installation

https://docs.moodle.org/404/en/Installing_plugins

## Contributors

This work has been graciously contributed by Lausanne University (Université de Lausanne).

## Development

To help acessing the tools used for development on Moodle projects, a Docker image can be generated for this repository.
To build the Docker image:

```sh
make build
```

To check the JavaScript code syntax:

```sh
make lint
```

To compile the JavaScript code:

```sh
make js
```

To check the PHP code, use the code-checker plugin of Moodle.
The URL to run the code-checker is:
https://your.moodle/local/codechecker/?path=lib%2Feditor%2Ftiny%2Fplugins%2Fubicast&includewarnings=1&showstandard=0
