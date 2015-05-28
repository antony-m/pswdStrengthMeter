(function($) {
	
	"use strict";
	
    $.fn.pswdStrengthMeter = function(passConfirmId, params) {
        var $passInput = this;
        var $confirmPassInput = $("#" + passConfirmId);

        //complexityLevel:
        // 1 - only minimal length
        // 2 - requires at least 1 lowercase letter
        // 3 - requires at least 1 digit
        // 4 - requires at least 1 uppercase letter
        // 5 - requires at least 1 special character

        var options = $.extend({
            minimalLength: 5,
            complexityLevel: 2,
            messageForPassImprovement: 'To improve your password\'s strength use combinations of letters and digits, lowercase and uppercase letters and also special characters  !,@,#,$,%,^,&,*,?,_,~,-,(,)',
            messageForInvalidChars: "Only latin letters, digits and special characters !,@,#,$,%,^,&,*,?,_,~,-,(,)' allowed"
        }, params);

        $passInput.addClass('pass123word');
        $passInput.after('<div class="validation-message-box"></div>');
        $confirmPassInput.addClass('confirmPass123word');
        $confirmPassInput.after('<div class="validation-message-box"></div>');
        $passInput.bind("keyup", passwordtyping);
        $confirmPassInput.bind("keyup", confirmationTyping);

        $passInput.after('<div class="passwordStrengthBar"  data-length="' + options.minimalLength + '"  data-complexity="' + options.complexityLevel + '"></div>');

        var $passwordStrengthBar = $('.passwordStrengthBar');
        var $messageConf = $($confirmPassInput.next('.validation-message-box')[0]);
        var $messagePass = $($passInput.siblings('.passwordStrengthBar').next()[0]);
        var invalidFlag = false;
        $passwordStrengthBar.width(0);

        function passwordtyping() {

            var score = 0;
            var fullLength = $passInput.width() + 7;
            $('.validation-message-box').width(fullLength);
            var passValue = $passInput.val();
            var confirmValue = $("#" + passConfirmId).val();
            if (confirmValue !== '') {
                checkMatch();
            }

            $messagePass.css('color', '#c9302c');
            if (passValue.length < options.minimalLength) {
                $messagePass.text("Minimal length - " + options.minimalLength);
                $passwordStrengthBar.width(fullLength / 100 * 20);
                $passwordStrengthBar.css('background-color', '#c9302c');
            } else {


                //has at least 1 digit
                if (passValue.match(/\d/) && !invalidFlag) {
                    score++;
                }

                //at least 1 lower 
                if (passValue.match(/[a-z]/) && !invalidFlag) {
                    score++;
                }

                //at least 1 capital 
                if (passValue.match(/[A-Z]/) && !invalidFlag) {
                    score++;
                }

                // at least 1 special character in password

                if (passValue.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) && !invalidFlag) {
                    score++;
                }

                // length is enough
                if (passValue.length >= options.minimalLength && !invalidFlag) {
                    $messagePass.css('color', '#c9302c');
                    $messagePass.text('weak password');
                    score++;
                }

                // if password is simple but long
                if (passValue.length >= 10 && !invalidFlag) {
                    score++;
                }
            }

            //if symbols are not latin 
            if (passValue.match(/[Ð-ï°-Ïñ¡]+/) && passValue !== '') {
                $messagePass.css('color', '#c9302c');
                $messagePass.html('Wrong symbols entered &nbsp;&nbsp;<a class="question-sign" data-tooltip="' + options.messageForInvalidChars + '"></a>');
                invalidFlag = true;
            } else {
                invalidFlag = false;
            }

            if (score > 5) {
                score = 5;
            }
            if (!invalidFlag) {
                switch (score) {
                    case 1:
                        $passwordStrengthBar.width(fullLength / 100 * 20);
                        $passwordStrengthBar.css('background-color', '#c9302c');
                        $passwordStrengthBar.attr('data-strength', '1');
                        $messagePass.css('color', '#c9302c');
                        $messagePass.html('very weak password &nbsp;&nbsp;<a class="question-sign" data-tooltip="' + options.messageForPassImprovement + '"></a>');
                        break;
                    case 2:
                        $passwordStrengthBar.width(fullLength / 100 * 40);
                        $passwordStrengthBar.css('background-color', '#DA6325');
                        $passwordStrengthBar.attr('data-strength', '2');
                        $messagePass.css('color', '#DA6325');
                        $messagePass.html('weak password &nbsp;&nbsp;<a class="question-sign" data-tooltip="' + options.messageForPassImprovement + '"></a>');
                        break;
                    case 3:
                        $passwordStrengthBar.width(fullLength / 100 * 60);
                        $passwordStrengthBar.css('background-color', '#ec971f');
                        $passwordStrengthBar.attr('data-strength', '3');
                        $messagePass.css('color', '#ec971f');
                        $messagePass.html('medium password &nbsp;&nbsp;<a class="question-sign" data-tooltip="' + options.messageForPassImprovement + '"></a>');
                        break;
                    case 4:
                        $passwordStrengthBar.width(fullLength / 100 * 80);
                        $passwordStrengthBar.css('background-color', '#989A31');
                        $passwordStrengthBar.attr('data-strength', '4');
                        $messagePass.css('color', '#989A31');
                        $messagePass.text('strong password');
                        break;
                    case 5:
                        $passwordStrengthBar.width(fullLength / 100 * 100);
                        $passwordStrengthBar.css('background-color', '#449d44');
                        $passwordStrengthBar.attr('data-strength', '5');
                        $messagePass.css('color', '#449d44');
                        $messagePass.text('very strong password');
                        break;
                }
            }
        }

        function confirmationTyping() {
            $messageConf.css('color', '#c9302c');
            checkMatch();
        }

        function checkMatch() {
            var passValue = $passInput.val();
            var confirmValue = $("#" + passConfirmId).val();
            if (passValue !== confirmValue) {
                $messageConf.text(' Passwords don\'t match');
            } else {
                $messageConf.text('');
            }
        }
    };
}(jQuery));