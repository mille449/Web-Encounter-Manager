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

        <div id="combatant_list_container">
            <div id="combatant" class="combatant" >
                    <span class="name">Name</span>
                    <span class="round">Round</span>
                    <span class="hp">HP</span>
                    <span class="maxhp">Max</span>
            </div>
            <div id="combatant_list"></div>            
        </div>

        <div id="add_combatant_comtainer">blargh!<br/> add combatant here!</div>
        <div id="amount_container">
            <div id="amount_type"></div>
            <input type="text" id="amount"/>
            <button id="amount_ok">OK</button>
            <button id="amount_cancel">Cancel</button>
        </div>
        
        <button class="action" onclick="Next()" >Next</button>
        <button class="action" onclick="ShowAmount(Damage)" >Damage</button>
        <button class="action" onclick="ShowAmount(Heal)" >Heal</button>
        <button class="action" onclick="ShowAmount(TempHP)" >Temp HP</button>
        <button class="action" onclick="AddCombatant()">Add Combatant</button>
        <button class="action" onclick="RemoveCombatant()">Remove Combatant</button>

        <div id="log_container"></div>
    </body>
</html>
