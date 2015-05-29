##JQuery Password strength meter plugin

This is a [jQuery](http://jquery.com/) plugin which analyzes password and it's confirmation while typing 

### Basic use

The plugin takes up confirmation field's id, and object "params" which has properties minimalLength, complexityLevel, messageForPassImprovement, messageForInvalidChars.

1. Using without passing params objects (defaults are defined inside).

    ```javascript
   $('#Pass123word').pswdStrengthMeter('confirmPass123word');
    ```
	
2. Passing params object.	

	```javascript
   $('#Pass123word').pswdStrengthMeter('confirmPass123word',{
            minimalLength: 5,
            complexityLevel: 2,
            messageForPassImprovement: "Some text",
            messageForInvalidChars: "Some text"
        });
    ```

Demo: http://jsfiddle.net/w01yr5qv/2/