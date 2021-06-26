// var ses = require('node-ses')
var AWS = require("aws-sdk");
var Config = require(_pathconst.FilesPath.ConfigUrl);

var ses = new AWS.SES({
  apiVersion: Config.apiVersion,
  accessKeyId: Config.accessKeyId,
  secretAccessKey: Config.secretAccessKey,
  sslEnabled: Config.sslEnabled,
  region: Config.region
});

exports.SendForgotEmail = function (
  DeepUrl,
  InvitedTo,
  Password,
  InvitedUserName
) {
  var MyDeepUrl = DeepUrl;
  var AgencyInvitedTo = InvitedTo;

  let templateData = {
    DeepLinkUrl: MyDeepUrl,
    InvitedToName: AgencyInvitedTo,
    InvitedUserName: InvitedUserName,
    Email: InvitedTo,
    UserPassword: Password
  };
  const params = {
    Source: "noreply@email.okuapp.com",
    Destination: {
      /* required */
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: [Email]
    },
    Template: "ForgotAdminPassword",
    ReplyToAddresses: ["noreply@email.okuapp.com"],
    ReturnPath: "noreply@email.okuapp.com",
    TemplateData: JSON.stringify(templateData)
  };

  ses.sendTemplatedEmail(params, (err, data) => {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

exports.CreateInviteAdminTemplate = function () {
  var params = {
    Template: {
      /* required */
      TemplateName: "InviteAdminTemplate4",
      /* required */
      HtmlPart:
        '<h3><img alt="" src=" https://okuapp.s3.ap-south-1.amazonaws.com/1569337251879App-Icon_xxhdpi.png" style="height:100px; margin-right:10px; width:100px" /><img alt="" src="https://okuapp.s3.ap-south-1.amazonaws.com/1569337280558App-Screen_512.png" style="height:100px; width:100px" /></h3> <h3>Congratulations {{InvitedUserName}} !</h3> <p>You have been onboarded as a {{RoleType}} on the oku app.&nbsp;Together we will help Millions of children realize their dreams.&nbsp;</p> <p>Login to start teaching.</p> <p>Email: {{InvitedUserEmail}}</p> <p>Password: {{InvitedUserPassword}}</p> <p>Lets Oku!</p> <p><a href="{{DeepLinkUrl}}" target="_blank">Click here for Login</a></p>',
      SubjectPart: "Welcome to Oku!"
    }
  };
  ses.createTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};
exports.CreateForgotAdminPasswordTemplate = function () {
  var params = {
    Template: {
      /* required */
      TemplateName: "ForgotAdminPassword",
      /* required */
      HtmlPart:
        '<h3>New Enrolment&nbsp;!</h3> <p>A new enrolment has been added.&nbsp;</p> <p>Name : {{Name}}</p> <p>Mail Id : {{MailId}}</p> <p>Contact No. : {{ContactNo}}</p> <p>City&nbsp; : {{City}}</p> <p>Detailed Offering : {{DetailedOffering}}</p> <p>Booked Amount : {{BookedAmount}}</p> <p>Paid Amount : {{PaidAmount}}</p> <p>Date of Payment : {{DateofPayment}}</p> <p>Sales POC : {{SalesPOC}}</p> <p>Payment Slip :&nbsp;<a href="{{PaymentSlip}}">Click here to view</a></p> <p>Resume :&nbsp;<a href="{{Resume}}">Click here to view</a></p> <p><a href="https://portal.leverageedu.com/app/students/details/?p={{StudentId}}" target="_blank">Click here for login</a>',
      SubjectPart: "Welcome to Oku!"
    }
  };
  ses.createTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

exports.CreateInviteUserTemplate = function () {
  var params = {
    Template: {
      /* required */
      TemplateName: "InviteUserTemplate",
      /* required */
      HtmlPart: "<h1>Hi, CheckEmailTemplate</h1>",
      SubjectPart: "Invite User",
      TextPart: "Dear Agent,\r\nYour."
    }
  };
  ses.createTemplate(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};
