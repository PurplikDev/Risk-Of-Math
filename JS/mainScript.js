const character_input = document.getElementById("character-select");

const character_name_display        = document.getElementById("character-name");
const character_type_display        = document.getElementById("character-type");
const character_image_display       = document.getElementById("character_image");
const character_health_display      = document.getElementById("character-health");
const character_damage_display      = document.getElementById("character-damage");
const character_speed_display       = document.getElementById("character-speed");
const character_armor_display       = document.getElementById("character-armor");

const site_items = document.getElementById("site_items");

////////////////////////////////////////////////////////////////////

character_input.onchange = showCharacter;

////////////////////////////////////////////////////////////////////

if (window.addEventListener) {
      window.addEventListener('load', generateItems);
   } else if (window.attachEvent) {
      window.attachEvent('onload', generateItems);
   } else { 
      window.onload = generateItems;
}

function generateItems() {
      for(i = 0; i < items.length; i++) {
            const new_item = document.createElement("div");
                  new_item.classList.add("draggable-item");
                  new_item.draggable = true;
            
            const new_item_image = document.createElement("img");
                  new_item_image.classList.add("item");
                  new_item_image.classList.add(items[i].itemRarity);
                  new_item_image.src = "itemIcons/" + items[i].itemRarity + "/" + items[i].itemIcon;

            site_items.appendChild(new_item);
            new_item.appendChild(new_item_image);
      }
}

////////////////////////////////////////////////////////////////////

const draggable_item = document.querySelectorAll(".draggable-item");
const item_lists = document.querySelectorAll(".item-list");

draggable_item.forEach(item => {
      item.addEventListener("dragstart", () => {
            item.classList.add("moving")
      })

      item.addEventListener("dragend", () => {
            item.classList.remove("moving")
      })
})

item_lists.forEach(item_list => {
      item_list.addEventListener("dragover", e => {
            e.preventDefault()
            const moving_item = document.querySelector(".moving")
            item_list.appendChild(moving_item)
      })
})

////////////////////////////////////////////////////////////////////

function showCharacter() {

      let selected_character = character_input.options[character_input.selectedIndex].id;
      
      switch(selected_character) {
            case "commando":        outputStats(commando);       break;
            case "huntress":        outputStats(huntress);       break;
            case "bandit":          outputStats(bandit);         break;
            case "mult":            outputStats(mult);           break;
            case "engineer":        outputStats(engineer);       break;
            case "artificer":       outputStats(artificer);      break;
            case "mercenary":       outputStats(mercenary);      break;
            case "rex":             outputStats(rex);            break;
            case "loader":          outputStats(loader);         break;
            case "acrid":           outputStats(acrid);          break;
            case "captain":         outputStats(captain);        break;
            case "railgunner":      outputStats(railgunner);     break;
            case "voidfiend":       outputStats(voidfiend);      break;
            case "heretic":         outputStats(heretic);        break;
            case "mithrix":         outputStats(mithrix);        break;
            case "scavenger":       outputStats(scavenger);      break;

            default: console.log("unknown-character");
      }

}

function outputStats(CharacterID) {
      character_name_display.innerText    = CharacterID.name;
      character_type_display.innerText    = CharacterID.type;
      character_image_display.src         = "characterIcons/" + CharacterID.name + ".png" //I have to do this monstrosity be cause just CharacterID would use the object, not the ID/word itself
      character_health_display.innerHTML    = "Health: " + CharacterID.health;
      character_damage_display.innerText    = "Damage: " + JSON.stringify(CharacterID.damage);
      character_speed_display.innerText    = "Speed: " + JSON.stringify(CharacterID.movement_speed) + " m/s";
      character_armor_display.innerText    = "Armor: " + JSON.stringify(CharacterID.armor);
}
