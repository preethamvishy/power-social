# Power Social

A social management tool for power users and agencies.

[![N|Solid](https://i.imgur.com/h4LBHVd.jpg)](#)

Basic useful feature list:

 * Schedule tweets
 * Add tweets to predefined queue
 * Works with tools every power user knows - Twitter and Buffer 


### Stuff used to make this:

 * Angular 4
 * NodeJS and Express 
 * [BufferJ](https://github.com/vitorenesduarte/bufferJ) - Java wrapper for the Buffer API.
 * Angular Material 2
 * Bootstrap



### Getting started:

 * Obtain your keys from [Twitter](https://apps.twitter.com/) and [Buffer](https://buffer.com/developers)
 * Add your Twitter and Buffer keys:

    config.js:
    ```javascript
    var appsettings = {
        consumerkey: 'your-key',
        consumersecret: 'your-key',
        bearertoken: ''
    };
    ```

    buffer.properties:
    ```javascript
    BufferAPI="your-buffer-key"
    ```
    
	TwitterApplication.java:
    ```java
	@Bean
	public Twitter twitter() {
		return new TwitterTemplate("consmer_key",
				"consumer_secret",
				"access_token",
				"accessTokenSecret");
	}
    ```

 * Run the Spring backend to fetch your profiles, tweet and schedule tweet. The Spring backend is typically required to run in `port 7777.`
 * `npm install` in the node backend and frontend directories.
 * `ng serve` in the frontend directory to power up the frontend. This will typically run in port 4200 by default. Head over to `http://localhost:4200.`
 * `node server.js` in node backend directory. The node backend runs on `port 5000` by default.
 

### 

Tweet panel             |  Masonry layout
:-------------------------:|:-------------------------:
![](https://imgur.com/pZX71Ae.jpg)  |  ![](https://imgur.com/c3Es9Bt.jpg)



