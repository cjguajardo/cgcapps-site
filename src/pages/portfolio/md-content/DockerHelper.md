---
title: 'NGPTServer'
layout: '../../../layouts/Layout.astro'
---

# docker_helper

Es un helper script para facilitar la tarea de dockerizar un entorno Laravel/Lumen especialmente.

Permite generar una imagen en modos de desarrollo y producción. En modo de desarrollo puedes ver reflejados los cambios en tiempo real.
También permite o facilita la tarea de publicar una imagen a un repositorio AWS ECR, así como ejecutar ciertas tareas extras, tales como:
  - Ejecutar en dispositivo (Android), para ello debes tener instalado ngrok.
  - Ejecutar en modo desarrollo con consola del contenedor para interactuar directamente con este.
  - Obfuscar y de-obfuscar controladores utilizando yakpro.
  - hacer pull a una imagen y correr el contenedor indistintamente si corresponde a tu proyecto o no. (puede ser una imagen externa).

## Documentation

    bash start <COMMAND> <OPTIONS>

    bash start [--dev | --prod | --aws | -run=<container> | --obfuscate | --deobfuscate] [--bash | --adb | -port]


### COMANDS
    -e=<environment>    : Environment (dev|prod|aws)
    --dev               : Development environment (localhost:80)
    --prod              : Production environment
    --aws               : Publish a production image to AWS repository

    -r=<container:tag>  : Run a container
    -run=<container:tag>
    --obfuscate         : Obfuscate the code
    --deobfuscate       : Deobfuscate the code

### OPTIONS
    -u=<url>            : URL to open on device, emulator or browser. Must use with ngrok.
    -p=<port>           : Port to run the server
    --adb               : Launch ADB on connected device or emulator with the given url
    -b | --bash         : Launch bash on container
    -h | --help         : Show this help

## Usage/Examples


#### Builds a production ready docker image and push it to AWS ECR with specified tag.
    bash start --aws  
        
#### Runs a docker container with the specified tag.
    bash start -run=<container:tag>  
        

By default PORT is 80 and URL is http://localhost for development and production environments.
## Authors

- [@cjguajardo](https://www.github.com/cjguajardo)


## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)


## Support

For support, email cj.guajardo@cgcapps.cl.

