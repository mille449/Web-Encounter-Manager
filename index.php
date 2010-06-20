<?php

//require_once("includes/std.php");
//echo "hello world";




?>

<html>
    <head>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js"></script>
        <script type="text/javascript" src="js/condition.js"></script>
        <script type="text/javascript" src="js/combatant.js"></script>
        <script type="text/javascript" src="js/encounter.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <link type="text/css" href="css/main.css" rel="stylesheet"/>
    </head>
    <body>
        <div id="header"></div>
        <div id="sidebar">
            <a id="b_next" class="action" href="#"> Next</a><br/>
            <a id="b_damage" class="action" href="#">Damage</a><br/>
            <a id="b_heal" class="action" href="#">Heal</a><br/>
            <a id="b_temphp" class="action" href="#">Temp HP</a><br/>
            <a id="b_add_combatant" class="action" href="#">Add Combatant</a><br/>
            <a id="b_remove_combatant" class="action" href="#">Remove Combatant</a><br/>
            <a id="b_reorder" class="action" href="#">Reorder</a><br/>
        </div>
        <div id="content">
            <span id="combatant_list_container" class="combatant_list">
                <div id="combatant_list_heading">
                    <a href="#" id="combatant" class="combatant" >
                            <span class="name">Name</span>
                            <span class="round">Round</span>
                            <span class="hp">HP</span>
                            <span class="maxhp">Max</span>
                    </a>
                </div>
                <div id="combatant_list" ></div>
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
            <span id="reserve_container" class="combatant_list">
                <div id="reserve_title">Reserve</div>
            </span>

            <span id="log_container" ></span>
        </div>
    </body>
</html>
