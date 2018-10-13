# mcd-shiftscript
A simple google script to parse shifts received by email into a Google Calendar

A few notes:
This script will only work if your shift receiving email is Gmail

LABEL_NAME should be the Gmail label for Work Shift Emails

CALENDAR_NAME should be the desired Calendar to use for work shifts

Setup:
-Create a new google script project and copy this code in
-Edit the LABEL_NAME and CALENDAR_NAME values below
-Hit 'Run' and run the McDShiftCheck function to set up permissions
-Go to Edit->Current Project Triggers and add a trigger to run the MMcDShiftCheck every 1 minute
