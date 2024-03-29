# Book management Project

## Setup file host (etc/host)

```
127.0.0.1 bookmanagement-admin-dev.com
```
## Noticed
	- Enable Hyper-V with command
	    => Open a PowerShell console as Administrator.
	    => Run the following command:
	    ``` Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All ```
	    => When the installation has completed, reboot.
	- Docker https://www.docker.com/products/docker-desktop
	    => After install Docker
	    => Open setting Docker and make sure option "Use the WSL 2 based engine" disabled.
	- Use file sh with git-scm
	    => Download and install git-scm : https://git-scm.com/
	- Use generate Swagger API document
		=> Run command
		``` php artisan l5-swagger:generate ```

## Shell Function:

	1. start-docker.sh -> init/start container docker for project
	2. ssh-container-app.sh -> ssh to container app project

# Installation Backend (Step by step)

- Step 1: Init Docker `Run file start-docker.sh`
- Step 2.1: Setup source Laravel `Run file ssh-container-app.sh => Run command : composer install`
- Step 2.2:`Keep the ssh-container-app.sh window => Run command : cp .env.example .env`
- Step 2.3: Generate app key `Keep the ssh-container-app.sh window => Run command : php artisan key:generate`
- Step 2.4: Generate jwt key `Keep the ssh-container-app.sh window => Run command : php artisan jwt:generate`
- Step 2.5: Run migration `Keep the ssh-container-app.sh window => Run command : php artisan migrate`
- Step 2.6: Create dummy data `Keep the ssh-container-app.sh window => Run command : php artisan db:seed`