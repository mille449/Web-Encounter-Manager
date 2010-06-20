<?php

//require_once("includes/std.php");
//echo "hello world";




?>

<html>
    <head>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="js/condition.js"></script>
        <script type="text/javascript" src="js/combatant.js"></script>
        <script type="text/javascript" src="js/encounter.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <link type="text/css" href="css/main.css" rel="stylesheet"/>
    </head>
    <body>

        <span id="combatant_list_container">
            <div id="combatant" class="combatant" >
                    <span class="name">Name</span>
                    <span class="round">Round</span>
                    <span class="hp">HP</span>
                    <span class="maxhp">Max</span>
            </div>
            <div id="combatant_list"></div>            
        </span>

        <span id="action_container">
            <div id="add_combatant_container">
                <label>Name</label><input class="text" type="text" id="combatant_name"/><br/>
                <label>Max HP</label><input class="only_numbers" type="text" id="combatant_max_hp"/><br/>
                <label>Player</label><input type="radio" id="isplayer" checked="true" name="isplayer"/><br/>
                <label>Monster</label><input type="radio" name="isplayer"/><br/>
                <button id="add_combatant_ok">OK</button>
                <button id="add_combatant_cancel">Cancel</button>
            </div>
            <div id="amount_container">
                <div id="amount_type"></div>
                <input class="only_numbers" type="text" id="amount"/><br/>
                <button id="amount_ok">OK</button>
                <button id="amount_cancel">Cancel</button>
            </div>
        </span>

        <br/>
        <button id="b_next" class="action" >Next</button>
        <button id="b_damage" class="action" >Damage</button>
        <button id="b_heal" class="action" >Heal</button>
        <button id="b_temphp" class="action" >Temp HP</button>
        <button id="b_add_combatant" class="action" >Add Combatant</button>
        <button id="b_remove_combatant" class="action" >Remove Combatant</button>

        <div id="log_container"></div>
    </body>
</html>
