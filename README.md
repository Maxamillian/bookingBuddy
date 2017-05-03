# Project Name

Booking Buddy

Booking Buddy is an online application that allows groups of friends to connect and make trip decision planning into a seamless, well organized, and painless process. 

## Team

  - __Product Owner__: Lou Kaileh
  - __Scrum Master__: Jesse DeOms
  - __Development Team Members__: Nate Nault, Preston Moore, Max Berger

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

To run this application, simply run node server/server.js from the root directory of the repository

## Requirements

This application runs on nodejs with express server.  It will require a postgres database.  The build process uses webpack and can be invoked with 'yarn build'.  Once the application is running, it will be available on localhost at port 3000.

## Development

### Installing Dependencies

If you choose to install yarn, follow these steps from within:
`brew update`
`brew install yarn`
Locate and open your profile. This will either be `.profle`, `.bashrc`, `.bash_profile`, or `.zshrc`. (For me it was the bashrc. It can be located in your root directory by using `ls -a`)
Add the following line to your profile.
``export PATH="$PATH:`yarn global bin`"``
Test that Yarn is running with `yarn --version`

### Roadmap

View the project roadmap [https://github.com/Aquilans/bookingBuddy/issues]


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
