#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

print_end_application () {
	echo -n "${green}Press Enter Key To Exit...${reset}"
	read VAR
	exit
}

cat << "EOF" 

______           _               _____ _             _   
|  _  \         | |             /  ___| |           | |  
| | | |___   ___| | _____ _ __  \ `--.| |_ __ _ _ __| |_ 
| | | / _ \ / __| |/ / _ \ '__|  `--. \ __/ _` | '__| __|
| |/ / (_) | (__|   <  __/ |    /\__/ / || (_| | |  | |_ 
|___/ \___/ \___|_|\_\___|_|    \____/ \__\__,_|_|   \__|
                                                         
                                                         

EOF

{
    echo "${green}Check Docker running${reset}"
    docker ps 
} || {
    echo "${red}Please Run Docker${reset}"
    print_end_application
}

{
    echo "${green}Run command stop all containers Docker${reset}"
    docker stop $(docker ps -a -q)
    echo "${green}Stop all containers success!${reset}"
} || {
    echo "${green}Process stop all containers success${reset}"
    print_end_application
}

{
    echo "${green}Pull and start docker containers in project${reset}"
    docker-compose up -d
    echo "${green}Check containers running ${reset}"
	docker ps
	
} || {
    echo "${red}Process run containers fail${reset}"
    print_end_application
}

print_end_application

