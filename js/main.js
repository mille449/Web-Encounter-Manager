function addClass(obj, className){
    $(obj).addClass(className);
}

function removeClass(obj, className){
    $(obj).removeClass(className);
}

function BindKeys(){
    // https://developer.mozilla.org/en/DOM/Event/UIEvent/KeyEvent

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

    $(".text").keydown(function(event){
        // this should prevent shortcut keys from triggering for a-z
        if (event.keyCode >= 65 && event.keyCode <= 90){
            event.stopPropagation();
        }
    });

    $(".only_numbers").keydown(function(event){
        // non-numeric characters
        if ((event.keyCode >= 59 && event.keyCode <= 90)
            || (event.keyCode >= 106 && event.keyCode <= 111)
            || (event.keyCode >= 188 && event.keyCode <= 222)
//            || event.keyCode == 8 // space
        ){
//            Log("canceleld "+event.which);
            event.preventDefault();
            event.stopPropagation(); // stop other shortcut keys
        }
    });

    $("#amount").keydown(function(event){
        if (event.keyCode == '13'){ // enter
            $("#amount_ok").click();
        }
        if (event.keyCode == '27'){ // escape
            $("#amount_cancel").click();
        }
    });

    $("#add_combatant_container").keydown(function(event){
        if (event.keyCode == '13'){ // enter
            $("#add_combatant_ok").click();
        }
        if (event.keyCode == '27'){ // escape
            $("#add_combatant_cancel").click();
        }
    });

}

function BindClicks(){
    $("#b_next").click(function(){ Next(); });
    $("#b_damage").click(function(){ ShowAmount(Damage); });
    $("#b_heal").click(function(){ ShowAmount(Heal); });
    $("#b_temphp").click(function(){ ShowAmount(TempHP); });
    $("#b_add_combatant").click(function(){
        ActionSwitch(function(){
           $("#add_combatant_container").animate({height:300});
           $("#combatant_name").focus();
        });
    });
    $("#b_remove_combatant").click(function(){ RemoveCombatant(); });
    $("#b_reorder").toggle(function(){ 
        $(this).addClass("selected");
        $(".combatant").removeClass("ui-selected");
        $(".combatant_list").selectable( "option", "disabled", true );
        $(".combatant_list").sortable( "option", "disabled", false );
    }, function(){
        $(this).removeClass("selected");
        $(".combatant_list").sortable( "option", "disabled", true );
        $(".combatant_list").selectable( "option", "disabled", false );
    });
    $("#amount_cancel").click(function(){
        $("#amount").attr("value","");
        $("#amount_container").animate({height:0});
        $("#amount").blur();
    });
    $("#add_combatant_ok").click(function(){
        AddCombatant();
//        $("#combatant_name").attr("value", "");
//        $("#combatant_max_hp").attr("value", "");
        $("#combatant_name").focus();
        $("#combatant_name").select();
    });
    $("#add_combatant_cancel").click(function(){
        ActionSwitch();
        $("#add_combatant_container").children().blur();
    });

}

/**
 * Animate the hide of all children of action_container and then
 * execute func.
 */
function ActionSwitch(func){
    $("#action_container").children().animate({height:0}, func );
}

function ShowAmount(func){
    ActionSwitch(function(){
        if (func == Damage) $("#amount_type").html("Damage");
        if (func == Heal) $("#amount_type").html("Heal");
        if (func == TempHP) $("#amount_type").html("Temp HP");
        $("#amount_container").animate({height:70});
    });
    $("#amount").focus();

    // these are not triggering at the right time, leaving a d/h/t in the box
    // the first time.  solution is hackish, but working.
//    $("#amount").attr("value","");
//    $("#amount_container").scrollTop(0);
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

    }

    BindKeys();
    BindClicks();

    $(".combatant_list").sortable({items: 'a', forcePlaceholderSize: true,
        placeholder: 'drophover',connectWith: '.combatant_list',
        disabled: true, cancel: '#combatant'
    });
    $(".combatant_list").selectable({distance: 0, filter: 'a'});
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

        current = $("#combatant_list > .combatant:first-child");
        combatant = Encounter.Combatants[current.attr("id")];
        Log(combatant.Name+"'s turn has begun.");
        Encounter.CheckStartConditions(combatant);
        // unlock here because this will happen last
        next_lock = false;
    }});

}

function Damage(amt){

    $(".combatant.ui-selected").each(function(){
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
    
    $(".combatant.ui-selected").each(function(){
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
    $(".combatant.ui-selected").each(function(){
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
    var name = $("#combatant_name").attr("value");
    var maxhp = $("#combatant_max_hp").attr("value");
    if (name == "" || maxhp == "") return;

    var combatant = new Combatant(name,maxhp);
    combatant.Round = Encounter.Round;
    combatant.IsPlayer = $("#isplayer").attr("checked");
    Encounter.AddCombatant(combatant);

    var node = $("#combatant").clone(true);
    node.attr("id",combatant.ID);
    node.children(".name").html(combatant.Name);
    node.children(".hp").html(combatant.MaxHP);
    node.children(".maxhp").html(combatant.MaxHP);
    node.children(".round").html(combatant.Round);
    node.appendTo("#reserve_container");
    if (combatant.IsPlayer) node.addClass("player");
    else node.addClass("monster");
}

function RemoveCombatant(){
    var msg = "Do you really want to remove the following combatants?\n\n";
    var ids = []; // keep track of ids in case things get deselected unexpectedly
    $(".combatant.ui-selected").each(function(){
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
