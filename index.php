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
        
        <button class="action" onclick="Next()" >Next</button>
        <button class="action" onclick="Damage()" >Damage</button>
        <button class="action" onclick="Heal()" >Heal</button>
        <button class="action" onclick="TempHP()" >Temp HP</button>

        <div id="log_container"></div>
    </body>
</html>
