function addClass(obj, className){
    $(obj).addClass(className);
}

function removeClass(obj, className){
    $(obj).removeClass(className);
}

function Init(){
    var c = new Combatant();
    c.Name = "Tim";
    c.MaxHP = 100;
    c.CurrHP = c.MaxHP;
    Encounter.AddCombatant(c);

    c = new Combatant();
    c.Name = "Matt";
    c.MaxHP = 150;
    c.CurrHP = c.MaxHP;
    c.IsPlayer = false;
    Encounter.AddCombatant(c);

    c = new Combatant();
    c.Name = "Dan";
    c.MaxHP = 200;
    c.CurrHP = c.MaxHP;
    Encounter.AddCombatant(c);

    c = new Combatant();
    c.Name = "Becky";
    c.MaxHP = 250;
    c.CurrHP = c.MaxHP;
    c.IsPlayer = false;
    Encounter.AddCombatant(c);


//    var bg_color = "gray";
//    Encounter.IterateCombatants(function(combatant){
    for(var ID in Encounter.Combatants){
        var combatant = Encounter.Combatants[ID];
        if (combatant == null) continue;

        var node = $("#combatant").clone(true);
        node.attr("id",combatant.ID);
        node.children(".name").html(combatant.Name);
        node.children(".hp").html(combatant.MaxHP);
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

    // set the height of the container so the stuff below it does not move.
    var h = $("#combatant_list").height() + $("#combatant").height();
    $("#combatant_list_container").height(h+20);

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
    Encounter.CheckStartConditions(combatant);
    
    
}

function Damage(){
    // pop up amount dialog

    var amt=25;
    $(".combatant.selected").each(function(){
        var combatant = Encounter.Combatants[this.id];
        var success = combatant.Damage(amt);
        $(this).children(".hp").html(combatant.CurrHP);
        $(this).removeClass("selected");
        if (success){
            // the color will change if the number changes
            $(this).addClass("damaged");
            window.setTimeout(removeClass, 600, this, "damaged");
        }
    });
}

function Heal(){
    // pop up amount dialog

    var amt=25;
    $(".combatant.selected").each(function(){
        var combatant = Encounter.Combatants[this.id];
        var success = combatant.Heal(amt);
        $(this).children(".hp").html(combatant.CurrHP);
        $(this).removeClass("selected");
        if (success){
            $(this).addClass("healed");
            window.setTimeout(removeClass, 600, this, "healed");
        }
    });
}
$(document).ready(Init);
