package com.example.demo;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bufferj.client.BufferJException;
import com.bufferj.entity.Profile;

@RestController
public class BufferController {
	
	@CrossOrigin(allowedHeaders="*", allowCredentials="true")
	@RequestMapping(value="/buffer", method=RequestMethod.POST, headers="content-type=application/json")
	public Map<String, String> bufferTweet( @RequestBody Map<String, Object> tweet)
	{
		TweetBuffer.bufferThisTweet(tweet);
		return Collections.singletonMap("statusText", "OK");
	}
	@CrossOrigin(allowedHeaders="*", allowCredentials="true")
	@RequestMapping(value="/getProfiles", method=RequestMethod.POST, headers="content-type=application/json")
	public List<Profile> getProfile() throws IOException, BufferJException
	{
		return TweetBuffer.getProfiles();	
	}
	
}
