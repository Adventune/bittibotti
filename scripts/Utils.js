exports.decodeMessage = function(message){
    var content = message.content;
    var args = content.split(' ');

    var prefix = JSON.stringify(args[0]);
    args = args.splice(1);
    if(args[0]=== undefined) args[0] = " ";
    var cmd = JSON.stringify(args[0].toLowerCase());
    args = JSON.stringify(args.splice(1));
    content = JSON.stringify(content);

    var json = JSON.parse("{ \"prefix\": " + prefix + ", \"cmd\": " + cmd + ", \"args\": " + args + ", \"content\": " + content + "}");
    return json;
}

exports.qaToJson = function(question, answer){
    question = JSON.stringify(question);
    answer = JSON.stringify(answer);
    var json = JSON.parse("{ \"question\": " + question + ", \"answer\": " + answer + "}");
    return json;
}

exports.parseQuestion = function(s){
    s = s.toLowerCase();
    s = s.replace(/[^a-zA-Z ]/g, "");
    return s;
}

exports.similarity = function(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


exports.isNum = function(value) {
    return !isNaN(value);
}