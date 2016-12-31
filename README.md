# Farerider
### A simple app/proof of concept for Week 1 JS teaching: uses Trimet API, Googlemaps API and Gulp tasks

* Uses Trimet API to return all bus stops within a certain radius of an address (user inputs address and radius in feet).
* Parses XML response and populates map via Googlemaps API with lat/long plus info window with route information.
* To replicate, create a .env file in root directory with the following line: exports.appId = "<API key from Trimet>";
* All gulp tasks (except sass-related) from week 1 JS.
