# Power Social

A social management tool for power users and agencies.

Basic useful feature list:

 * Schedule tweets
 * Add tweets to predefined queues
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




