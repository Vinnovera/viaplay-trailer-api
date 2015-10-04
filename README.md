### Installing
```bash
$ npm install
```
### Configuration
No configuration is needed. But for staging, production etc the ```config/default.json``` may be duplicated to  ```config/production.json``` and so on.

### Running
Launch clustered instance
```bash
$ npm start
```
Launch single instance
```bash
$ node server
```

### Trying it out
```bash
$ curl http://localhost:8080/trailer?url=https://content.viaplay.se/web-se/film/lucy-2014
```

### System and unit tests
#### Installation
```bash
$ npm install -g mocha
```
#### Run tests
```bash
$ npm test
```

### Notes
#### Clustering
This service won't be very CPU intensive since it's mainly IO. The reason for the clustering is to maximize CPU core utilization in future API features.

#### Caching
Since the realtionship between the Trailer Addict API and Viaplay Content API is one to one (in this case) and also because of the large amount of data in both APIs, I didn't see an object cache as the way to go. It's the combination of the two APIs that I wanted to cache. That's why I chose to cache the end point response with ```apicache```. I've set the TTL to 1 hour. That's probably not enough, I guess it could be alot longer, like a day or so.

One issue I found though was that the in-memory cache ```memory-cache``` that ```apicache``` uses isn't shared between node instances. Which makes it kind of useless when clustered. Would be a nice feature in both those project. I had a look at other solutions like ```memored``` that solves this issue. But for this challenge it would've been way too much work changing ```apicache``` ;) Also I really like how easy ```apicache``` is to implement and configure. I hope you understand what I tried to accomplish here without me sending you a final solution.

And from an infrastructure point of view I would've prefered an external cache solution like Varnish or any form of CDN cache for this kind of API.

#### Promises
I'm no big fan of promises and I don't agree with the callback-hell hating. Callbacks works great when you know how to modularize and split up your code in small chunks. And when you need your callbacks in order ```async``` is always there to help :) But since all the hating I gave it a go and went into the then-hell instead. I guess you'll notice that I'm no full featured promise coder, yet. 

#### Models
At the time of writing this I would've created the models somewhat different. It would've been better to have more specific models where the film and trailer got stored in objects inside their models and then use getters for the specific values/data needed. Now it's more like helper methods piping the data around using promises. But I blame my use of promises for that ;)

#### Other
* Some kind of versioning of the API would be nice, but I didn't implement that
* The url query param in the trailer route could need some sanitizing
