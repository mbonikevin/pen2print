![Alt text](./assets/banner.png)

# Pen2Print

**Version**: 1.0  
**Built by**: Kevin Kaneza Mbonimpaye  
**Built on**: March 24, 2025   
**Powered by**: Pen to Print API from [RapidAPI](https://rapidapi.com)

## Demo

**Web app**: [mbonikevin.tech](https://mbonikevin.tech)  
**Short Demo Video**: [Watch YouTube Video](https://youtu.be/16hfMYzJKoU)

## Overview

Pen2Print is a web application designed to extract text from handwritten images. It uses the Pen to Print API from RapidAPI to convert scanned handwritten content into digital text. The app features a simple interface that allows users to upload handwritten images and receive text extraction results in real-time.

For more information, visit [Pen to Print API](https://rapidapi.com/serendi/api/pen-to-print-handwriting-ocr).

## Features

- **Text Extraction**: Converts handwritten text from images to digital text.
- **Edit & Download**: After extracting your handwriten images to text you are able to edit it and download it as .txt file

### Deployment

## 1. Server Setup

Pen2Print is deployed across two web servers for high availability. A load balancer (HAProxy) is used to distribute incoming traffic between the two web servers.

#### Prerequisites

- Two Ubuntu web servers running Nginx.
- HAProxy as a load balancer.

#### Web Server Setup

1. **Install Dependencies**:
   On both web servers, install Nginx:

   ```bash
   sudo apt update
   sudo apt install nginx

   ```

2. **Configure Nginx**: Set up Nginx to serve your app. Edit the Nginx configuration `(/etc/nginx/sites-available/default)`:

   ```
   server {
       listen 80;
       server_name _;

       location / {
           root /var/www/html;
           index index.html;
       }
   }
   ```

3. **Configure Nginx** Upload the Pen2Print app files to `/var/www/html` on both web servers.

## 2. Load Balancer Configuration

HAProxy is used to route incoming traffic between the two web servers.

### Prerequisites

- HAProxy installed on the load balancer server.

### Load Balancer Setup

1. **Install HAProxy** on the load balancer server:
   ```
   sudo apt update
   sudo apt install haproxy
   ```
2. **Configure HAProxy**: Modify the HAProxy configuration to point to the two web servers (replace with the actual IP addresses of your web servers). Here’s an example HAProxy configuration `(/etc/haproxy/haproxy.cfg)`:

   ```
   global
       log /dev/log local0
       maxconn 200

   defaults
       log     global
       option  httplog
       timeout connect 5000ms
       timeout client  50000ms
       timeout server  50000ms

   frontend http_front
       bind *:80
       default_backend http_back

   backend http_back
       balance roundrobin
       server web01 18.207.204.181:80 check
       server web02 18.233.154.199:80 check

   ```

3. **Restart HAProxy**: to apply the changes:
   ```
       sudo systemctl restart haproxy
   ```

## 3. Testing the Load Balancer

Once the load balancer is set up, test the application by visiting your domain (which should point to the load balancer). The load balancer will distribute traffic between the two web servers.

To verify that the load balancing is working, check the web server logs or monitor the load balancer’s traffic distribution.

To confirm that HAProxy is correctly listening on port 80, run:

`sudo netstat -tuln | grep :80`

If HAProxy is working correctly, the output should show it listening on port 80.

You can also perform manual testing by accessing the domain multiple times and verifying that the requests are being routed to both web servers by watching the server name in the website title

## Conclusion

This guide outlines how to deploy the Pen2Print web application on two servers, configure a load balancer to distribute traffic, and test the system to ensure everything works as expected. With the help of the Pen to Print API, the application offers a fast and accurate handwriting recognition solution.

Thank you for using Pen2Print, and special thanks to the Pen to Print API team for making this possible!
