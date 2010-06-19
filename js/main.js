function addClass(obj, className){
    $(obj).addClass(className);
}

function removeClass(obj, className){
    $(obj).removeClass(className);
}

function BindKeys(){
    $(document).keydown(function(event){
        switch(event.keyCode){
            case 65: // a
                break;
            case 67: // c
                break;
            case 68: // d
                ShowAmount(Damage);
                break;
            case 72: // h
                ShowAmount(Heal);
                break;
            case 78: // n
                Next();
                break;
            case 83: // r
                break;
            case 84: // t
                ShowAmount(TempHP);
                break;
            default:
//                Log("Key pressed: "+event.which);
                break;
        }
    });

    $("#amount").keydown(function(event){
        // https://developer.mozilla.org/en/DOM/Event/UIEvent/KeyEvent
        if (event.keyCode == '13'){ // enter
            $("#amount_ok").click();
        }
        if (event.keyCode == '27'){ // escape
            $("#amount_cancel").click();
        }
        // non-numeric characters
        if ((event.keyCode >= 59 && event.keyCode <= 90) ||
            (event.keyCode >= 106 && event.keyCode <= 111) ||
            (event.keyCode >= 188 && event.keyCode <= 222)){
            Log("canceleld "+event.which);
            event.preventDefault();
        }
    });

    $("#amount_cancel").click(function(){
        $("#amount").attr("value","");
        $("#amount_container").animate({height:0});
        $("#amount").blur();
    });
    $("#amount").blur();
}

function ShowAmount(func){
    if (func == Damage) $("#amount_type").html("Damage");
    if (func == Heal) $("#amount_type").html("Heal");
    if (func == TempHP) $("#amount_type").html("Temp HP");

    $("#amount_container").animate({height:50});
    $("#amount").focus();
    
    setTimeout('$("#amount").attr("value","");$("#amount_container").scrollTop(0);',100);
    
    $("#amount_ok").unbind("click"); // in case they pressed another key first
    $("#amount_ok").click(function(){
        var amt = parseInt($("#amount").attr("value"));
        if(amt >= 0){
            func(amt);
            $("#amount_cancel").click();
        }else{
            $("#amount").attr("value","");
        }
    });

}

function Init(){
    var c = new Combatant("Tim",100);
    Encounter.AddCombatant(c);

    c = new Combatant("Matt",150);
    c.IsPlayer = false;
    Encounter.AddCombatant(c);

    c = new Combatant("Dan",200);
    Encounter.AddCombatant(c);

    c = new Combatant("Becky",250);
    c.IsPlayer = false;
    Encounter.AddCombatant(c);


    // generate name plates for combatants in encounter
//    Encounter.IterateCombatants(function(combatant){
    for(var ID in Encounter.Combatants){
        var combatant = Encounter.Combatants[ID];
        if (combatant == null) continue;

        var node = $("#combatant").clone(true);
        node.attr("id",combatant.ID);
        node.children(".name").html(combatant.Name);
        node.children(".hp").html(combatant.MaxHP);
        node.children(".maxhp").html(combatant.MaxHP);
        node.children(".round").html(combatant.Round);
        node.appendTo("#combatant_list");
        if (combatant.IsPlayer) node.addClass("player");
        else node.addClass("monster");


        node.toggle(function(){
            addClass(this, "selected");
        },function(){
            removeClass(this, "selected");
        });

    
    };

    BindKeys();
}

// this will prevent this function from executing again before it is finished.
// needed for things like multiple clicks.
var next_lock = false;
function Next(){
    if ( next_lock ) return;
    next_lock = true;
    var current = $("#combatant_list > .combatant:first-child");
    var combatant = Encounter.Combatants[current.attr("id")];

    Encounter.CheckEndConditions(combatant);
//    Log("", "endturn");
    $("#log_container").children(":last").addClass("endturn");

    // move the person on top to the bottom
    var h = 20;//current.height(); // set to static in case the previous animation did not complete


    current.animate({"height": "0px"},{queue:false, duration:"fast",
        complete:function(){
        // appending to the parent container will bump the combatant to the bottom
        // of the list
        current.appendTo("#combatant_list");
        current.animate({"height": h+"px"},"fast");
//        current.height(h);

        // increment the round in the callback so it happens when the combatant
        // reaches the bottom
        combatant.Round++;
        current.children(".round").html(combatant.Round);

        // unlock here because this will happen last
        next_lock = false;
    }});

    

    current = $("#combatant_list > .combatant:first-child");
    combatant = Encounter.Combatants[current.attr("id")];
    Log(combatant.Name+"'s turn has begun.");
    Encounter.CheckStartConditions(combatant);
    
    
}

function Damage(amt){

    $(".combatant.selected").each(function(){
        var combatant = Encounter.Combatants[this.id];
        var changed = combatant.Damage(amt);
        $(this).children(".hp").html(combatant.HPString());
        $(this).click(); // deselect
        if (changed){
            // the color will change if the number changes
            SetStatus(this);
            $(this).addClass("damaged");
            window.setTimeout(removeClass, 600, this, "damaged");
        }
    });
}

function Heal(amt){
    
    $(".combatant.selected").each(function(){
        var combatant = Encounter.Combatants[this.id];
        var changed = combatant.Heal(amt);
        $(this).children(".hp").html(combatant.HPString());
        $(this).click(); // deselect
        if (changed){
            SetStatus(this);
            $(this).addClass("healed");
            window.setTimeout(removeClass, 600, this, "healed");
        }
    });
}

function SetStatus(obj){
    var combatant = Encounter.Combatants[obj.id];
    $(obj).removeClass("dead dying bloodied");
    if (combatant.IsDead){
        $(obj).addClass("dead");
    }else if (combatant.IsDying){
        $(obj).addClass("dying");
    }else if (combatant.IsBloodied){
        $(obj).addClass("bloodied");
    }
}

function TempHP(amt){

    $(".combatant.selected").each(function(){
        var combatant = Encounter.Combatants[this.id];
        var changed = combatant.AddTempHP(amt);
        $(this).children(".hp").html(combatant.HPString());
        $(this).click(); // deselect
        if (changed){
            SetStatus(this);
            $(this).addClass("healed");
            window.setTimeout(removeClass, 600, this, "healed");
        }
    });
}

function AddCombatant(){
    
}

function RemoveCombatant(){
    var msg = "Do you really want to remove the following combatants?\n\n";
    var ids = []; // keep track of ids in case things get deselected unexpectedly
    $(".combatant.selected").each(function(){
        ids.push(this.id);
        msg += Encounter.Combatants[this.id].Name + "\n";
    });
    if (ids.length == 0) return;

    var result = confirm(msg);
    if(result){
        for (var n in ids){
            Encounter.RemoveCombatant(ids[n]);
            $("#"+ids[n]).remove();
        }
    }
}

$(document).ready(Init);
