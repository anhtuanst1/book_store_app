#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
cyan=`tput setaf 6`
reset=`tput sgr0`

echo "${yellow}"
cat << "EOF" 
______      _ _   _____                                           
 ____ ____  _   _      _    ____  ____
/ ___/ ___|| | | |    / \  |  _ \|  _ \
\___ \___ \| |_| |   / _ \ | |_) | |_) |
 ___) |__) |  _  |  / ___ \|  __/|  __/
|____/____/|_| |_| /_/   \_\_|   |_|
     
=========================================================================
| 		Select the menu to perform the function			|
|	1. SSH source book_management_admin				|
=========================================================================
EOF
echo "${reset}"

print_end_application () {
	echo -n "${green}Press Any Key To Exit...${reset}"
	read VAR
	exit
}
print_menu () {
	printf "${green}Please select menu : [1]\n${reset}"
	read ask
	
	case "$ask" in
        1)
            main_script "book_management_admin" ;;
        *)
            print_menu
	esac
}

main_script(){
	local environment=$1
	echo $environment
	echo "${green}Start ssh to ${cyan} $environment ${reset}"
	{
		winpty docker-compose exec app bash -c "cd $environment && /bin/bash"
		exit
	} || {
		echo "${red}ssh Fail${reset}"
	}
	echo "${green}End ssh with source${cyan} $environment ${reset}"
}

print_menu 
