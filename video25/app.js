Ext.onReady(function () {

    Ext.create('Ext.Button', {
        text: 'Alerta',
        renderTo: 'btnAlert',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.alert('Alerta', 'Simples alerta!', function (btn) {
                console.log('apertou o botão ' + btn);
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Comfirmação',
        renderTo: 'btnConfirm',
        cls: 'btn btn-second',
        handler: function () {
            Ext.MessageBox.confirm('Alerta', 'Simples alerta!', function (btn) {
                console.log('apertou o botão ' + btn);
                if (btn == 'yes') {
                    Ext.MessageBox.alert('Mensagem', ' Registro deletado com sucesso!');
                }
                else if (btn == 'no') {
                    console.log('Cancelou - não deletou o registro. ');
                }
            });
        }
    });
    Ext.create('Ext.Button', {
        text: 'Prompt',
        renderTo: 'btnPrompt',
        cls: 'btn btn-second',
        handler: function () {
            Ext.MessageBox.prompt('Prompt', 'Qual o seu nome?', function (btn, text) {
                console.log('apertou o botão ' + btn + ' e enviou o texto ' + text);
                if (btn == 'ok') {
                    Ext.MessageBox.alert('Bem vindo', 'Bem vindo(a) ' + text + '!');
                }
                else if (btn == 'cancel') {
                    console.log('Cancelou - não deletou o registro. ');
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Prompt Multiline',
        renderTo: 'btnPromptMult',
        cls: 'btn btn-second',
        handler: function () {
            Ext.MessageBox.prompt('Prompt', 'O que você gsta de fazer?', function (btn, text) {
                console.log('apertou o botão ' + btn + ' e enviou o texto ' + text);
                if (btn == 'ok') {
                    Ext.MessageBox.alert('Mensagem' + text);
                }
                else if (btn == 'cancel') {
                    console.log('Cancelou. ');
                }
            },
                this,
                true,
                'descreva aqui o que você gosta de fazer...');
        }
    });

    Ext.create('Ext.Button', {
        text: 'Icone - Error',
        renderTo: 'btnError',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Erro!',
                msg: 'Ops algo não vai bem, Sorry! :(',
                icon: Ext.MessageBox.ERROR
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Icone - Info',
        renderTo: 'btnInfo',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Info!',
                msg: 'Registro deletado com sucesso!',
                icon: Ext.MessageBox.INFO
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Icone - Question',
        renderTo: 'btnQuest',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Pergunta!',
                msg: 'Você tem certeza que quer fazer isso?',
                icon: Ext.MessageBox.QUESTION
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Icone - Warning',
        renderTo: 'btnWarning',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Atenção!',
                msg: 'Se toca meu vai dar mer*!',
                icon: Ext.MessageBox.WARNING
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - Cancel',
        renderTo: 'btnCancel',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Cancelar!',
                msg: 'Se toca meu vai dar mer*!',
                icon: Ext.MessageBox.CANCEL,
                buttons: Ext.MessageBox.CANCEL,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - No',
        renderTo: 'btnNo',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'No!',
                msg: 'Você gosta de jiló!',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.NO,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - Ok',
        renderTo: 'btnOk',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'No!',
                msg: 'Ela não gosta de jiló!',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OK,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - btnOkCancel',
        renderTo: 'btnOkCancel',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Ok Cancel!',
                msg: 'Você quer cancelar o registro?',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.OKCANCEL,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                    if (btn == 'ok') {
                        Ext.MessageBox.alert("Mensagem!", "Registro deletado com sucesso!");
                    }
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - Yes',
        renderTo: 'btnYes',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Yes!',
                msg: 'Ela não gosta de jiló!',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YES,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - YesNo',
        renderTo: 'btnYesNo',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Yes No!',
                msg: 'Você quer deletar esse registro?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - YesNoCancel',
        renderTo: 'btnYesNoCancel',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Yes No Cancel!',
                msg: 'Você quer deletar esse registro?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YESNOCANCEL,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });


    Ext.create('Ext.Button', {
        text: 'Botão - Show PromptMult',
        renderTo: 'btnShowPromptMult',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Show Prompt!',
                msg: 'Por qual motivo você gosta de jiló?',
                // prompt: true, //quando não for multiline colocar prompt
                multiline: true, //quando for multiline não precisa de inserir prompt
                width: 400,
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.OK,
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - Progersso',
        renderTo: 'btnProgress',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Progresso!',
                msg: 'Carregando os dados...',
                progress: true,
                progressText: 'Carregando...',
                closable: false, //para não aparecer o x de fechar a janela
                width: 300
            });

            var f = function (v) {
                return function () {
                    if (v == 12) {
                        Ext.MessageBox.hide();
                        Ext.MessageBox.alert("Pronto!", "Os dados foram carregados!");
                    } else {
                        var i = v / 11;
                        Ext.MessageBox.updateProgress(i, Math.round(100*i) + '%');
                    }
                };
            }

            for (var i = 1; i < 13; i++) {
                setTimeout(f(i), i * 500);
            }
        }
    });

    Ext.create('Ext.Button', {
        text: 'Botão - YesNoCancel',
        renderTo: 'btnYesNoCancelCustom',
        cls: 'btn btn-primary',
        handler: function () {
            Ext.MessageBox.show({
                title: 'Yes No Cancel!',
                msg: 'Você quer deletar esse registro?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YESNOCANCEL,
                buttonText: {
                    yes: 'Sim',
                    no:'Não',
                    cancel: 'Cancelar'
                },  
                fn: function (btn) {
                    console.log('apertou o botão ' + btn);
                }
            });
        }
    });

});
