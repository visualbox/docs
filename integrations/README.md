---
sidebar: auto
---

# Integrations
This document is aimed at those who whish to develop integrations that run in dashboards. An integration is a [Docker image](https://docs.docker.com/engine/reference/commandline/images/) that runs as a container on a cluster when added to a dashboard. VisualBox enables developers to define their own [Dockerfile](https://docs.docker.com/engine/reference/builder/), which makes it possible to write integration code in virtually any environment and programming language.

## Environment Templates
When you create a new integration you have the option to choose from a set of pre-defined environment templates. These templates provide a starting point for a Dockerfile and example code that shows how to communicate with the VisualBox service.

### Utility Docker Layer
Each template makes use of the VisualBox [Utility Docker Layer](https://github.com/visualbox/visualbox-base-images/blob/master/utils/Dockerfile), which is a set of modules/bindings for different programming languages to enable seamless communication with the VisualBox service.

The Utility Docker Layer also contains a **boot** binary, which acts as a middleware between the integration process and VisualBox. This allows the container to read the standard output/error stream of the integration process and handle socket connections. Arguments supplied to the **boot** binary are executed as the integration process.

E.g. if you want to start your integration by running `node index.js`:
``` dockerfile
# Include Utility Docker Layer
FROM visualboxio/utils:latest as utils

# Integration image
FROM node:12-alpine

# Copy `boot` binary from Utility Docker Layer
COPY --from=utils /boot /visualbox/boot

# Run `node index.js` through the `boot` binary
ENTRYPOINT /visualbox/boot node index.js
```

::: danger
You must use the **boot** binary as the [ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint) in the Docker image, or the container will immediately terminate.
:::

### Node
The entrypoint for the [Node environment](https://github.com/visualbox/visualbox-templates/tree/master/integration-node) is an `index.js` file in the root folder. A `package.json` file can be used to automatically install additional required dependencies.

You must import the globally accessible `visualbox` module to access the [configuration model](/configmodel/) as well as send data back to a VisualBox dashboard:

``` js
const visualbox = require('visualbox')
```

The [configuration model](/configmodel/) is accessible through the `visualbox.MODEL` variable:

``` js
// visualbox.MODEL.<name>
const myVariable = visualbox.MODEL.myVariable
// or: const { myVariable } = visualbox.MODEL
```

To send data back to a VisualBox dashboard, use the `visualbox.output()` method:

``` js
visualbox.output({ myVariable })
// or: visualbox.output('a string')
```

The `visualbox.output()` method will try to parse a JavaScript object into a JSON string.

### Python 3
The entrypoint for the [Python 3 environment](https://github.com/visualbox/visualbox-templates/tree/master/integration-python3.7) is a `main.py` file in the root folder. A `requirements.txt` file can be used to automatically install additional required dependencies.

You must import the globally accessible `visualbox` module to access the [configuration model](/configmodel/) as well as send data back to a VisualBox dashboard:

``` python
import visualbox
```

The [configuration model](/configmodel/) is accessible through the `visualbox.MODEL` dictionary:

``` python
# visualbox.MODEL["<name>"]
myVariable = visualbox.MODEL["myVariable"]
```

To send data back to a VisualBox dashboard, use the `visualbox.output()` method:

``` python
visualbox.output(myVariable)
# or: visualbox.output("a string")
```

The `visualbox.output()` method will try to parse a Python dictionary into a JSON string.

### Go
The entrypoint for the Go environment is a `main.go` file in the root folder. A `glide.yaml` file can be used to automatically install additional required dependencies.

You must import the globally accessible `visualbox` package to access the [configuration model](/configmodel/) as well as send data back to a VisualBox dashboard:

``` go
import "visualbox"
```

The [configuration model](/configmodel/) is accessible through the `visualbox.MODEL` interface:

``` go
// visualbox.MODEL[<name>]
myVariable = visualbox.MODEL["myVariable"]
```

To send data back to a VisualBox dashboard, use the `visualbox.Output()` method (with a capital "O"):

``` go
visualbox.Output(myVariable)
// or: visualbox.Output("a string")
```

The `visualbox.Output()` method will try to parse a Go map into a JSON string.
