# Marston by EE
Marston by EE is a standalone web client for lightning nodes.

It was created by Encrypted Energy and is provided as is for use with the Encrypted Energy node management service. 

## Prerequisites

You will need a node js install to run this locally. 

Head over to https://nodejs.org for install packages, or to https://nodejs.org/en/download/package-manager if you prefer the command line. 

## Setup

Now you can clone this repo.
`git clone git@github.com:lucbocahut/marston-by-ee.git`

Then enter the directory and install dependencies
`npm install`

Create a settings.json file in the root directory that looks something like this. If you don't specify email settings messages will be output to standard output.
```
{
    "connectors": {
        "email": {
            "connection": {
                "user": "user@domain.com",
                "pass": "password",
                "host": "smtp.mailsender.com",
                "port": "587"
            },
            "to": ["cc@domain.com"],
            "from": "Marston <web@encryptedenergy.com>",
            "replyTo": "Marston Admin <luc@encryptedenergy.com>"
        }
    }
}
```

## Runnning
To run use `npm start`

To test use `npm test`

## Default user setup
On first launch, you will be prompted to login. Use the create account link to create your account. If you have not setup email sending the password creation link will be sent to standard output. Use this link to set your password and you will be able to login. 

## Connect your first node
To connect your lightning node you will need a url and an admin macaroon. The admin macaroon is used to send commands back to your node. Once your node is connected you will see it on the `/nodes` page. You will be able to see current channels and events related to your node. 

## Encrypted Energy Setup
The Encrypted Energy service sends node related events and commands to your node. To set this up:
1. locate your node specific url in the Marston UI, it's under the events tab in your node page and should look something like: https://yourdomain.com/events/abCDefG1234Hij23K
2. add this url to the Streams page on the Encrypted Energy website

You can control and override the commands which will be relayed to your node by using the Marston UI, under your node's settings tab.
