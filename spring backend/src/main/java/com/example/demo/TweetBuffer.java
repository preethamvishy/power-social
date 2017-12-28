package com.example.demo;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.bufferj.client.BufferJ;
import com.bufferj.client.BufferJException;
import com.bufferj.client.util.CreateUpdates;
import com.bufferj.entity.Profile;
import com.bufferj.entity.Update;
import com.bufferj.entity.Updates;

public class TweetBuffer {
	public static void bufferThisTweet(Map<String, Object> tweet)
	{
		String tweetText = tweet.get("text").toString();
		if (tweet.get("mediaDisplayUrl") != null) {
			tweetText = tweetText.replace(tweet.get("url").toString(), tweet.get("mediaDisplayUrl").toString());
			tweet.put("text", tweetText);
		}
		if (tweetText.contains("&amp;"))
			tweetText = tweetText.replace("&amp;", "&");

		Properties prop = loadProperties();
		CreateUpdates createUpdates = null;
		BufferJ buffer = null;
		try {
			buffer = new BufferJ(prop.getProperty("BufferAPI"));
			List<Profile> profiles = buffer.getProfiles();
			createUpdates = new CreateUpdates();
			
			String acct = tweet.get("bufferToAccount").toString();
			createUpdates.addProfile(fetchBufferProfile(profiles, acct));

			createUpdates.setText(tweetText);
			if (tweet.get("postNow").toString().equalsIgnoreCase("true"))
				createUpdates.setNow(true);
			else if(tweet.get("scheduled").toString().equalsIgnoreCase("true"))
			{
				long schAt = Long.parseLong(tweet.get("scheduledAt").toString());
				createUpdates.setScheduledAt(schAt);
			}
			if (tweet.get("photoUrl") != null)
				createUpdates.setMediaPhoto(tweet.get("photoUrl").toString());

		} catch (Exception ex) {
			ex.printStackTrace(System.err);
		}
	}

	public static Properties loadProperties() {
		Properties prop = new Properties();
		InputStream input = null;

		try {
			input = new FileInputStream("src/main/resources/buffer.properties");
			// load a properties file
			prop.load(input);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return prop;
	}

	public static List<Profile> getProfiles() throws IOException, BufferJException// BufferTweetBean tweet)
	{
		
		Properties prop = loadProperties();
		BufferJ buffer = null;
		buffer = new BufferJ(prop.getProperty("BufferAPI"));
		return buffer.getProfiles();
		
	}
}
