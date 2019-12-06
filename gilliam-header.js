/*
============================================
; Title:  header.js
; Author: Cory Gilliam
; Date:   4 June 2019
; Modified By: Cory Gilliam
; Description: Displays a formatted header
;===========================================
*/

/**
* Params: firstName, lastName, assignment
* Response: output
* Description: Returns a well-formatted string header
*/
exports.display = function (firstName, lastName, assignment) {
  return '\n' + firstName + ' ' + lastName + '\n' + assignment + '\nDate: ' + new Date().toLocaleDateString('en-US') + '\n';
}
