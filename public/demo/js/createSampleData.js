/**
 * Created by kathires on 8/25/16.
 */

function getJson(){
//['Java','.Net','Oracle', 'JavaScript', 'Html5', 'NodeJs', 'ActionScript', 'Objective C', 'Php', 'MongoDb', 'AngularJs', 'Android', 'XML', 'MySql','SqlServer','C#','Selenium', 'Testing', 'Shell Script', 'Linux', 'C++', 'C']
    var tests = ['Java','.Net'],
        template = {
            index:0,
            topic: "",
            title: "",
            level:0,
            questions:[]
        },
        finalJson = [],
        index = 0;

    for( var i = 0, len = tests.length; i < len; i++ ){

        var test = tests[i];

        for( var j = 0; j < 3; j++ ) {

            var data = {};

            data.index = index++;
            data.topic = test.replace(/ /g,'').toLowerCase();
            data.title = test;
            data.level = j;
            data.questions = [];
            for( var k = 0; k < 5; k++ ){

                data.questions[k] = {
                    'question' : 'This is a sample question number '+(k+1)+' for test with title '+test,
                    'choices'  : ['Option 1','Option 2', 'Option 3', 'Option 4'],
                    'answer'   : 0
                };

            }
            finalJson.push(data);
        }

    }

    return finalJson;

}