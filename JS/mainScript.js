const character_input = document.getElementById("character-select");

const character_name_display        = document.getElementById("character-name");
const character_type_display        = document.getElementById("character-type");
const character_image_display       = document.getElementById("character_image");
const character_health_display      = document.getElementById("character-health");
const character_regen_display       = document.getElementById("character-regen");
const character_damage_display      = document.getElementById("character-damage");
const character_speed_display       = document.getElementById("character-speed");
const character_sprint_display      = document.getElementById("character-sprint");
const character_armor_display       = document.getElementById("character-armor");

const health_bar_health      = document.getElementById("health-bar-health");
const health_bar_shield      = document.getElementById("health-bar-shield");
const health_bar_perma       = document.getElementById("health-bar-perma");

const player_level_input = document.getElementById("player-level");

////////////////////////////////////////////////////////////////////

character_input.onchange = defaultStats;
player_level_input.onchange = defaultStats;

////////////////////////////////////////////////////////////////////

function defaultModifiers() {
    healthModifier = 1;
    permaDamageModifier = 1;
    healthRegenModifier = 0;
    normalSpeedModifier = 1;
    sprintModifier = 1.45;
    attackSpeedModifier = 1;
    damageModifier = 1;
    flatHealthModifier = 0;
    playerArmorModifier = 1;
    playerArmorFlat = 0;
    bungusModifier = 0;
    playerShield = 0;

    onHitCritChance = 1;
    onHitBleedChance = 0;
    onHitStickyBombChance = 0;
    onHitStunChance = 0;

    onKillBarrier = 0;
    onKillGasRadius = 0;
    onKillGasDamage = 0;
    toothModifier = 0;

    onHitEnemyDamageBlock = 0;
    onHitPenniesOnHit = 0;
    onHitMedkit = 0;

    corrupted = false;
}

defaultModifiers();

////////////////////////////////////////////////////////////////////

const site_items = document.getElementById("site_items");

generateItems();

function generateItems() {
    for(i = 0; i < items.length; i++) {
            const new_item = document.createElement("div");
                new_item.classList.add("draggable-item");
                new_item.setAttribute("id", items[i].itemID);
          
            const new_item_image = document.createElement("img");
                new_item_image.classList.add("item");
                new_item_image.classList.add(items[i].itemRarity);
                new_item_image.classList.add(items[i].itemID);
                new_item_image.src = "itemIcons/" + items[i].itemRarity + "/" + items[i].itemIcon;

            const new_number_input_div = document.createElement("div");
                new_number_input_div.classList.add("item-amount-input-div");

            const new_number_input = document.createElement("input");
                new_number_input.type = "number";  
                new_number_input.setAttribute("id", items[i].itemID + "-item-amount");
                new_number_input.classList.add("item-amount-input");
                new_number_input.setAttribute("min", "1");
                new_number_input.setAttribute("value", "1");
                new_number_input.setAttribute("onchange", "itemDetection()");
                

        site_items.appendChild(new_item);
        new_item.appendChild(new_item_image);
        new_item.appendChild(new_number_input_div);
        new_number_input_div.appendChild(new_number_input);
    }
}

////////////////////////////////////////////////////////////////////

const draggable_item = document.querySelectorAll(".draggable-item");
const item_lists = document.querySelectorAll(".item-list");

draggable_item.forEach(item => {

      item.addEventListener("dragstart", () => {
            item.classList.add("moving");
      })

      item.addEventListener("dragend", () => {
            item.classList.remove("moving");
            itemDetection();
      })
})

item_lists.forEach(item_list => {
      item_list.addEventListener("dragover", e => {
            e.preventDefault();
            const moving_item = document.querySelector(".moving");
            item_list.appendChild(moving_item);
      })
})

////////////////////////////////////////////////////////////////////

function getCharacterID() {

      let selected_character = character_input.options[character_input.selectedIndex].id;

      switch(selected_character) {
            case "commando":        return commando;       break;
            case "huntress":        return huntress;       break;
            case "bandit":          return bandit;         break;
            case "mult":            return mult;           break;
            case "engineer":        return engineer;       break;
            case "artificer":       return artificer;      break;
            case "mercenary":       return mercenary;      break;
            case "rex":             return rex;            break;
            case "loader":          return loader;         break;
            case "acrid":           return acrid;          break;
            case "captain":         return captain;        break;
            case "railgunner":      return railgunner;     break;
            case "voidfiend":       corrupted = true; return voidfiend;      break;
            case "heretic":         return heretic;        break;
            case "mithrix":         return mithrix;        break;
            case "scavenger":       return scavenger;      break;

            default: console.log("unknown-character");
      }

}

////////////////////////////////////////////////////////////////////

function itemDetection() {
    
    defaultStats();

    const player_items = document.getElementById("player_items");
    const items_in_inventory = player_items.querySelectorAll(".draggable-item");

    console.clear();

    defaultModifiers();

    items_in_inventory.forEach(item => {

        switch(item.id) {
            case "debug":   console.log("debug");   break;

            case "repulsion_armor_plate":   
                playerArmorFlat += 5 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;
            
            case "mocha":                   
                normalSpeedModifier = normalSpeedModifier + (0.07 * parseInt(document.getElementById(item.id + "-item-amount").value));
                attackSpeedModifier = attackSpeedModifier + (0.075 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "topaz_brooch":            
                onKillBarrier = onKillBarrier + (15 * parseInt(document.getElementById(item.id + "-item-amount").value));   
            break;

            case "tougher_times":      
                amountTougherTimes = 0.15*parseInt(document.getElementById(item.id + "-item-amount").value);

                onHitEnemyDamageBlock = (1 - (1/(amountTougherTimes+1))) * 100;
            break;

            case "tri_tip_dagger":          
                onHitBleedChance = onHitBleedChance + (10 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "armor_piercing_rounds":   
                damageModifier = damageModifier + (0.20 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "lens_makers_glasses":     
                onHitCritChance = onHitCritChance + (10 * parseInt(document.getElementById(item.id + "-item-amount").value)); 
            break;

            case "crowbar":                 
                damageModifier = damageModifier + (0.75 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "bundle_of_fireworks":     
                //Well, this item does not do much so there's not really a reason to add the stuff it does, at least for now  
            break;

            case "bison_steak":             
                flatHealthModifier = 25 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

            case "delicate_watch":          
                damageModifier = damageModifier + (0.20 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "roll_of_pennies":         
                onHitPenniesOnHit = 3 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

            case "cautious_slug":           
                healthRegenModifier += 3 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

            case "power_elixir":            
                //Same deal as Bundle of Fireworks, not much reason to add the stats yet.
            break;

            case "pauls_goat_hoof":        
                console.log(findItem(item.id));
                normalSpeedModifier = normalSpeedModifier + (0.14 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "gasoline":
                if(parseInt(document.getElementById(item.id + "-item-amount").value) <= 1) {
                    onKillGasRadius = 12;
                    onKillGasDamage = 150;
                } else {
                    onKillGasRadius = onKillGasRadius + (4 * parseInt(document.getElementById(item.id + "-item-amount").value));
                    onKillGasDamage = onKillGasDamage + (75 * parseInt(document.getElementById(item.id + "-item-amount").value));
                }    
                
            break;

            case "medkit":            
                onHitMedkit = onHitMedkit + (20 * (1 + (0.05 * parseInt(document.getElementById(item.id + "-item-amount").value))));
            break;
            
            case "bustling_fungus":            
                bungusModifier = finalPlayerHealth * (0.045 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "focus_crystal":            
                damageModifier = damageModifier + (0.20 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "oddly_shaped_opal":            
                playerArmorFlat += 100 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

            case "personal_shield_generator":            
                playerShield = Math.round((finalPlayerHealth * healthModifier) * (0.08 * parseInt(document.getElementById(item.id + "-item-amount").value)));
            break;

            case "backup_magazine":            
                //Same deal as Bundle of Fireworks, not much reason to add the stats yet.
            break;

            case "energy_drink":            
                console.log(findItem(item.id));
                sprintModifier = sprintModifier + (0.25 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "sticky_bomb":            
                onHitStickyBombChance = 5 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

            case "stun_grenade":
                amountStun = 0.05 * parseInt(document.getElementById(item.id + "-item-amount").value);      
                onHitStunChance = (1 - (1/(amountStun+1))) * 100;
                onHitStunChance = Math.round(onHitStunChance * 10) / 10;
            break;

            case "soldiers_syringe":            
                attackSpeedModifier = attackSpeedModifier + (0.15 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

            case "monster_tooth":            
                toothModifier = finalPlayerHealth * (0.02 * parseInt(document.getElementById(item.id + "-item-amount").value));
            break;

                //UNCOMMON

                //LEGENDARY

                //BOSS

            case "shatterspleen":            
                onHitBleedChance = onHitCritChance;
            break;

            case "titanic_knurl":            
                flatHealthModifier = 40 * parseInt(document.getElementById(item.id + "-item-amount").value);
                healthRegenModifier += 1.6 * parseInt(document.getElementById(item.id + "-item-amount").value);
            break;

                //VOID

                //LUNAR

            case "stone_flux_pauldron":
                for(i = 0; i < parseInt(document.getElementById(item.id + "-item-amount").value); i++){
                    healthModifier = healthModifier * 2; 
                    normalSpeedModifier = normalSpeedModifier * 0.5;
                }
            break;

            case "shaped_glass":
                for(i = 0; i < parseInt(document.getElementById(item.id + "-item-amount").value); i++){
                    damageModifier = damageModifier * 2; 
                    if(parseInt(document.getElementById(item.id + "-item-amount").value) < 128) {permaDamageModifier = permaDamageModifier * 0.5;} else {permaDamageModifier = 0}
                }
            break;

            default: console.log("Unknown Item");
        }
    })
    
    defaultStats();
    calculateHealthBar();
}

function findItem(itemID) {
    for(i = 0; i < items.length; i++) {
        if(items[i].itemID == itemID) {
            return items[i].itemName;
        }
    }
}

function defaultStats() {

    corrupted = false;

    let CharacterID = getCharacterID();

    calculateStats(CharacterID);

    calculateHealthBar();

    character_name_display.innerText    = CharacterID.name;
    character_type_display.innerText    = CharacterID.type;
    if(CharacterID == voidfiend) {character_image_display.src = "characterIcons/voidfiend.png"} else {character_image_display.src = "characterIcons/" + CharacterID.name + ".png"}
    //I have to do this monstrosity be cause just CharacterID would use the object, not the ID/word itself
    character_health_display.innerHTML  = Math.ceil(finalPlayerHealth * healthModifier) + playerShield + "/" + Math.ceil(finalPlayerHealth * healthModifier);
    if(bungusModifier == 0) {character_regen_display.innerHTML   = "Health Regeneration: " + Math.round(finalPlayerHealthRegen*10)/10 + " hp/s";} else {character_regen_display.innerHTML   = "Health Regeneration: " + Math.round(finalPlayerHealthRegen*10)/10 + " hp/s <BR> Bungus Regeneration: " + bungusModifier;}
    character_damage_display.innerText  = "Damage: " + finalPlayerDamage;
    character_speed_display.innerText   = "Normal Speed: " + finalPlayerNormalSpeed + " m/s";
    character_sprint_display.innerText  = "Sprinting Speed: " + finalPlayerSprintSpeed + " m/s";
    character_armor_display.innerText   = "Armor: " + finalPlayerArmor;

    on_hit_bleed_display.innerText      = "Chance to proc bleed: " + onHitBleedChance + "%";
    if(CharacterID != railgunner) { on_hit_crit_display.innerText = "Chance to crit: " + onHitCritChance + "%"; } else { on_hit_crit_display.innerText = "100% Crit chance due to special ability"}
    on_hit_bomb_display.innerText      = "Chance to attach a sticky bomb : " + onHitStickyBombChance + "%";
    on_hit_stun_display.innerText      = "Chance to stun an enemy : " + onHitStunChance + "%";

    on_kill_barrier.innerText           = "On kill barrier: " + onKillBarrier;
    on_kill_gas.innerHTML               = "Gas ignition radius: " + onKillGasRadius + "m <BR> Gas fire damage: " + onKillGasDamage + "% <BR> Which translates to: " + finalPlayerDamage * (onKillGasDamage / 100);
    on_kill_healing_orb.innerText       = "On kill spawns an orb that heals: " + toothModifier;

    enemy_on_hit_damage_block.innerText     = "Chance to block incoming damage: " + finalPlayerHitBlock + ",";
    enemy_on_hit_pennies_amount.innerText   = "Amount of money you recieve on hit: " + onHitPenniesOnHit;
    enemy_on_hit_medkit.innerText   = "Healing from Medkit on hit: " + onHitMedkit;
}

function calculateStats(CharacterID) {

    var player_level = player_level_input.value - 1;

    if(player_level > 0) {
        finalPlayerHealth = CharacterID.health + (CharacterID.health_increase * player_level);
        finalPlayerHealthRegen = CharacterID.health_regen + (CharacterID.health_regen_increase * player_level);
        finalPlayerDamage = CharacterID.damage + (CharacterID.damage_increase * player_level);
    } else {
        finalPlayerHealth = CharacterID.health;
        finalPlayerHealthRegen = CharacterID.health_regen;
        finalPlayerDamage = CharacterID.damage;
    }

    finalPlayerHealthRegen = finalPlayerHealthRegen + healthRegenModifier;

    finalPlayerHealth = (Math.round(finalPlayerHealth) + flatHealthModifier) * permaDamageModifier;
    finalPlayerDamage = (Math.round((finalPlayerDamage * damageModifier) * 100) / 100);

    finalPlayerArmor = CharacterID.armor; //JS is being stupid so I have to do this weird thing
    finalPlayerArmor = Math.round((playerArmorFlat * playerArmorModifier));

    finalPlayerNormalSpeed = CharacterID.movement_speed * normalSpeedModifier;
    finalPlayerNormalSpeed = Math.round(finalPlayerNormalSpeed * 100) / 100;

    finalPlayerSprintSpeed = finalPlayerNormalSpeed * sprintModifier;
    finalPlayerSprintSpeed = Math.round(finalPlayerSprintSpeed * 100) / 100;

    finalPlayerHitBlock = Math.round(onHitEnemyDamageBlock * 10) / 10;
}

function calculateHealthBar() {
    var playerHealthTotal = (finalPlayerHealth * healthModifier) + playerShield;
    
    oneRercentHealth = playerHealthTotal / 100;

    permaDamagedHealth = ((finalPlayerHealth * healthModifier) + playerShield) * permaDamageModifier;
    permaDamagedHealthFinal = playerHealthTotal - permaDamagedHealth;

    var healthPercentage = Math.ceil((((finalPlayerHealth * healthModifier) * permaDamageModifier)/oneRercentHealth)*100)/100
    var shieldPercentage = Math.round((playerShield/oneRercentHealth)*100)/100
    var permaPercentage = Math.round((permaDamagedHealthFinal/oneRercentHealth)*100)/100;

    health_bar_health.style.width = healthPercentage+'%';
    health_bar_shield.style.width = shieldPercentage+'%';
    health_bar_perma.style.width = permaPercentage+'%';
    
    if(corrupted == true) {
        health_bar_health.style.backgroundColor = '#a358b3';
    } else {
        health_bar_health.style.backgroundColor = '#61ad31';
    }
}