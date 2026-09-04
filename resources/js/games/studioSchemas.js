/**
 * Studio schemas — copied from the VincentVanGogh game modules (app/Games/*Module.php via FieldDef::toArray()).
 * Each field: { key, prop, type, label, group, default, meta }. The player component receives
 * { [prop]: config[key] } exactly as the tenant studio builds it.
 * Regenerate from VincentVanGogh when a game module changes.
 */
export const STUDIO_SCHEMAS = {
  "slots": {
    "key": "slots",
    "label": "Slots",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Intro Video / Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "Video plays 5s intro, then freezes as background"
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "spin_button_image",
        "prop": "spinButtonImage",
        "type": "media",
        "label": "Spin Button",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom button graphic"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the game opens"
        }
      },
      {
        "key": "spin_sound",
        "prop": "spinSound",
        "type": "media",
        "label": "Spin Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the reels spin"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a prize is revealed"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when no win is revealed"
        }
      },
      {
        "key": "machine_bg_color",
        "prop": "machineBgColor",
        "type": "color",
        "label": "Modal Background",
        "group": "Colors & Style",
        "default": "#1a5a7a",
        "meta": {
          "help": "Supports alpha (8-digit hex)"
        }
      },
      {
        "key": "inventory_emoji",
        "prop": "inventoryEmoji",
        "type": "text",
        "label": "Inventory Emoji",
        "group": "Colors & Style",
        "default": "🎣",
        "meta": []
      },
      {
        "key": "inventory_button_color",
        "prop": "inventoryButtonColor",
        "type": "color",
        "label": "Inventory Button Color",
        "group": "Colors & Style",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "match_text_color",
        "prop": "matchTextColor",
        "type": "color",
        "label": "Match Text Color",
        "group": "Colors & Style",
        "default": "#7FDBFF",
        "meta": []
      },
      {
        "key": "win_glow_color",
        "prop": "winGlowColor",
        "type": "color",
        "label": "Win Glow Color",
        "group": "Colors & Style",
        "default": "#FFD700",
        "meta": {
          "help": "Payline, win flames, symbol highlight, and \"YOU WON\" text"
        }
      },
      {
        "key": "machine_border_color",
        "prop": "machineBorderColor",
        "type": "color",
        "label": "Machine Border Color",
        "group": "Colors & Style",
        "default": "#00BFFF",
        "meta": {
          "help": "Slot machine frame, reel borders, and balance box"
        }
      },
      {
        "key": "prizes_modal_bg_color",
        "prop": "prizesModalBgColor",
        "type": "color",
        "label": "Modal Background",
        "group": "Prizes Modal",
        "default": "#1F2937",
        "meta": []
      },
      {
        "key": "prizes_title_color",
        "prop": "prizesTitleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Prizes Modal",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "prizes_card_border_color",
        "prop": "prizesCardBorderColor",
        "type": "color",
        "label": "Card Border",
        "group": "Prizes Modal",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "prizes_card_bg_color",
        "prop": "prizesCardBgColor",
        "type": "color",
        "label": "Card Background",
        "group": "Prizes Modal",
        "default": "#374151",
        "meta": []
      },
      {
        "key": "prizes_value_color",
        "prop": "prizesValueColor",
        "type": "color",
        "label": "Prize Value",
        "group": "Prizes Modal",
        "default": "#10B981",
        "meta": []
      }
    ]
  },
  "scratchy": {
    "key": "scratchy",
    "label": "Scratchy",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Full-screen backdrop behind the game"
        }
      },
      {
        "key": "overlay",
        "prop": "overlay",
        "type": "media",
        "label": "Overlay Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Scratch surface layer (if empty, uses metallic gradient)"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Logo/banner shown above the cards"
        }
      },
      {
        "key": "scratchy_intro_video",
        "prop": "scratchyIntroVideo",
        "type": "media",
        "label": "Intro Video / Animation",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "MP4, WebM or animated WebP — plays for 3 seconds before the lobby"
        }
      },
      {
        "key": "scratchy_layout",
        "prop": "scratchyLayout",
        "type": "select",
        "label": "Layout",
        "group": "Layout",
        "default": "single",
        "meta": {
          "options": [
            {
              "value": "single",
              "label": "Single"
            },
            {
              "value": "grid",
              "label": "Grid"
            }
          ]
        }
      },
      {
        "key": "scratchy_card_bg",
        "prop": "scratchyCardBg",
        "type": "color",
        "label": "Card Background",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_card_border",
        "prop": "scratchyCardBorder",
        "type": "color",
        "label": "Card Border",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "accentColour",
        "prop": "accentColour",
        "type": "color",
        "label": "Accent / Glow",
        "group": "Card Styling",
        "default": "#52b77b",
        "meta": []
      },
      {
        "key": "scratchy_surface_color",
        "prop": "scratchySurfaceColor",
        "type": "color",
        "label": "Scratch Surface",
        "group": "Card Styling",
        "default": "",
        "meta": {
          "help": "Empty = silver metallic"
        }
      },
      {
        "key": "scratchy_button_color",
        "prop": "scratchyButtonColor",
        "type": "color",
        "label": "Button Color",
        "group": "Card Styling",
        "default": "",
        "meta": {
          "help": "Empty = theme secondary"
        }
      },
      {
        "key": "scratchy_container_bg",
        "prop": "scratchyContainerBg",
        "type": "color",
        "label": "Container Background",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_title_text",
        "prop": "scratchyTitleText",
        "type": "text",
        "label": "Title Text",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_title_color",
        "prop": "scratchyTitleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Card Styling",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "textColour",
        "prop": "textColour",
        "type": "color",
        "label": "Overlay Text",
        "group": "Text Colors",
        "default": "#eeeeee",
        "meta": {
          "help": "Ticket # on scratch surface"
        }
      },
      {
        "key": "wonTextColour",
        "prop": "wonTextColour",
        "type": "color",
        "label": "Win Text",
        "group": "Text Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "loseTextColour",
        "prop": "loseTextColour",
        "type": "color",
        "label": "Lose Text",
        "group": "Text Colors",
        "default": "#000000",
        "meta": []
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the game opens"
        }
      },
      {
        "key": "scratch_sound",
        "prop": "scratchSound",
        "type": "media",
        "label": "Scratch Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Loops while scratching"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a prize is revealed"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when \"NO WIN\" is revealed"
        }
      },
      {
        "key": "scratchy_show_top_prize",
        "prop": "scratchyShowTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": true,
        "meta": {
          "help": "Displays the highest prize on the lobby and game screen"
        }
      }
    ]
  },
  "spinny": {
    "key": "spinny",
    "label": "Spinny",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "logo",
        "prop": "logo",
        "type": "media",
        "label": "Winner Segment Logo",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Small icon for wheel segments"
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Wheel Title",
        "group": "Text & Colors",
        "default": "SPIN WHEEL",
        "meta": []
      },
      {
        "key": "title_color",
        "prop": "titleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Text & Colors",
        "default": "#793181",
        "meta": []
      },
      {
        "key": "wallet_text",
        "prop": "walletText",
        "type": "text",
        "label": "Wallet Card Text",
        "group": "Text & Colors",
        "default": "SPIN WALLET",
        "meta": {
          "help": "Text on floating credit card"
        }
      },
      {
        "key": "wallet_color",
        "prop": "walletColor",
        "type": "color",
        "label": "Wallet Card Color",
        "group": "Text & Colors",
        "default": "#8b5cf6",
        "meta": {
          "help": "Primary card color"
        }
      },
      {
        "key": "wheel_edge_color",
        "prop": "wheelEdgeColor",
        "type": "color",
        "label": "Wheel Edge Glow",
        "group": "Text & Colors",
        "default": "#00aeffff",
        "meta": {
          "help": "Gradient glow around wheel"
        }
      }
    ]
  },
  "bingo": {
    "key": "bingo",
    "label": "Bingo",
    "schema": [
      {
        "key": "diamond_emoji",
        "prop": "diamondEmoji",
        "type": "text",
        "label": "Diamond / Emoji Symbol",
        "group": "Symbol",
        "default": "💎",
        "meta": {
          "help": "Shown on winning squares (💎 🌟 ⭐ 🎯)"
        }
      },
      {
        "key": "bg_start",
        "prop": "bgStart",
        "type": "color",
        "label": "Modal BG (Start)",
        "group": "Theme Colors",
        "default": "#1e3a8a",
        "meta": []
      },
      {
        "key": "bg_end",
        "prop": "bgEnd",
        "type": "color",
        "label": "Modal BG (End)",
        "group": "Theme Colors",
        "default": "#1e40af",
        "meta": []
      },
      {
        "key": "frame_color",
        "prop": "frameColor",
        "type": "color",
        "label": "Card Border",
        "group": "Theme Colors",
        "default": "#3b82f6",
        "meta": []
      },
      {
        "key": "frame_glow",
        "prop": "frameGlow",
        "type": "color",
        "label": "Border Glow",
        "group": "Theme Colors",
        "default": "#60a5fa",
        "meta": []
      },
      {
        "key": "square_bg",
        "prop": "squareBg",
        "type": "color",
        "label": "Square BG",
        "group": "Theme Colors",
        "default": "#374151",
        "meta": []
      },
      {
        "key": "square_text",
        "prop": "squareText",
        "type": "color",
        "label": "Square Text",
        "group": "Theme Colors",
        "default": "#e5e7eb",
        "meta": []
      },
      {
        "key": "diamond_1",
        "prop": "diamond1",
        "type": "color",
        "label": "Diamond Color 1",
        "group": "Theme Colors",
        "default": "#06b6d4",
        "meta": []
      },
      {
        "key": "diamond_2",
        "prop": "diamond2",
        "type": "color",
        "label": "Diamond Color 2",
        "group": "Theme Colors",
        "default": "#67e8f9",
        "meta": []
      },
      {
        "key": "winner_glow",
        "prop": "winnerGlow",
        "type": "color",
        "label": "Winner Glow",
        "group": "Theme Colors",
        "default": "#10b981",
        "meta": []
      },
      {
        "key": "winner_bg",
        "prop": "winnerBg",
        "type": "color",
        "label": "Winner BG",
        "group": "Theme Colors",
        "default": "#059669",
        "meta": []
      },
      {
        "key": "popup_start",
        "prop": "popupStart",
        "type": "color",
        "label": "Popup Start",
        "group": "Theme Colors",
        "default": "#10b981",
        "meta": []
      },
      {
        "key": "popup_end",
        "prop": "popupEnd",
        "type": "color",
        "label": "Popup End",
        "group": "Theme Colors",
        "default": "#059669",
        "meta": []
      },
      {
        "key": "pattern_rules",
        "prop": "patternRules",
        "type": "pattern_rules",
        "label": "Pattern Rules",
        "group": "Pattern Rules",
        "default": [],
        "meta": {
          "help": "Set patterns based on prize value ranges. Leave empty for random patterns.",
          "patternNames": [
            "Top Row",
            "Middle Row",
            "Bottom Row",
            "Left Column",
            "Middle Column",
            "Right Column",
            "Diagonal TL-BR",
            "Diagonal TR-BL",
            "Cross Pattern (5 Squares)",
            "Full House (All 9)"
          ],
          "itemRules": {
            "pattern_rules.*.from": [
              "required_with:pattern_rules",
              "numeric",
              "min:0"
            ],
            "pattern_rules.*.to": [
              "required_with:pattern_rules",
              "numeric",
              "min:0"
            ],
            "pattern_rules.*.pattern": [
              "required_with:pattern_rules",
              "integer",
              "min:0",
              "max:9"
            ]
          },
          "itemDefault": {
            "from": 0,
            "to": 99.99,
            "pattern": 0
          }
        }
      },
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header / Banner",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "card_cover",
        "prop": "cardCover",
        "type": "media",
        "label": "Card Cover",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "reveal_sound",
        "prop": "revealSound",
        "type": "media",
        "label": "Reveal Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      }
    ]
  },
  "coindrop": {
    "key": "coindrop",
    "label": "Coin Drop",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Intro Video / Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "Video plays 5s intro, then freezes as background"
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "game_background",
        "prop": "gameBackground",
        "type": "media",
        "label": "Game Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Background image for the game board area"
        }
      },
      {
        "key": "drop_button_image",
        "prop": "dropButtonImage",
        "type": "media",
        "label": "Drop Button",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom button graphic"
        }
      },
      {
        "key": "ball_image",
        "prop": "ballImage",
        "type": "media",
        "label": "Ball/Coin Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom coin/ball graphic (PNG with transparency recommended)"
        }
      },
      {
        "key": "tube_image",
        "prop": "tubeImage",
        "type": "media",
        "label": "Drop Tube Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom tube/dispenser image where coins drop from"
        }
      },
      {
        "key": "win_bucket_image",
        "prop": "winBucketImage",
        "type": "media",
        "label": "Win Bucket Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Image for winning buckets (replaces green color)"
        }
      },
      {
        "key": "lose_bucket_image",
        "prop": "loseBucketImage",
        "type": "media",
        "label": "Lose Bucket Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Image for losing buckets (replaces red color)"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "drop_sound",
        "prop": "dropSound",
        "type": "media",
        "label": "Drop Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "peg_shape",
        "prop": "pegShape",
        "type": "select",
        "label": "Peg Shape",
        "group": "Colors & Style",
        "default": "hexagon",
        "meta": {
          "options": [
            {
              "value": "hexagon",
              "label": "Hexagon"
            },
            {
              "value": "circle",
              "label": "Circle"
            },
            {
              "value": "square",
              "label": "Square"
            }
          ]
        }
      },
      {
        "key": "board_bg_color",
        "prop": "boardBgColor",
        "type": "color",
        "label": "Board Background",
        "group": "Colors & Style",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "peg_color",
        "prop": "pegColor",
        "type": "color",
        "label": "Peg Border Color",
        "group": "Colors & Style",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "peg_glow_color",
        "prop": "pegGlowColor",
        "type": "color",
        "label": "Peg Glow Color",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "ball_color",
        "prop": "ballColor",
        "type": "color",
        "label": "Ball Color",
        "group": "Colors & Style",
        "default": "#ffd700",
        "meta": []
      },
      {
        "key": "ball_glow_color",
        "prop": "ballGlowColor",
        "type": "color",
        "label": "Ball Glow Color",
        "group": "Colors & Style",
        "default": "#ffaa00",
        "meta": []
      },
      {
        "key": "win_bucket_color",
        "prop": "winBucketColor",
        "type": "color",
        "label": "Win Bucket Color",
        "group": "Colors & Style",
        "default": "#00ff88",
        "meta": []
      },
      {
        "key": "lose_bucket_color",
        "prop": "loseBucketColor",
        "type": "color",
        "label": "Lose Bucket Color",
        "group": "Colors & Style",
        "default": "#ff4444",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary Color",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "secondary_color",
        "prop": "secondaryColor",
        "type": "color",
        "label": "Secondary Color",
        "group": "Colors & Style",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent Color",
        "group": "Colors & Style",
        "default": "#ffd700",
        "meta": []
      },
      {
        "key": "trail_color",
        "prop": "trailColor",
        "type": "color",
        "label": "Ball Trail Glow",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      }
    ]
  },
  "popgame": {
    "key": "popgame",
    "label": "Pop Game",
    "schema": [
      {
        "key": "pop_subtitle_text",
        "prop": "popSubtitleText",
        "type": "text",
        "label": "Lobby Subtitle Text",
        "group": "Lobby",
        "default": "",
        "meta": {
          "help": "Text shown below the title on the lobby screen (leave empty for default)"
        }
      },
      {
        "key": "pop_item_label",
        "prop": "popItemLabel",
        "type": "text",
        "label": "Pop Item Label",
        "group": "Lobby",
        "default": "",
        "meta": {
          "help": "What to call the items (e.g. \"gifts\", \"boxes\", \"stars\"). Used in How to Play text. Leave empty for auto-detect from item type."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title Text",
        "group": "Lobby Title",
        "default": "POP TO WIN!",
        "meta": []
      },
      {
        "key": "title_color",
        "prop": "titleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Lobby Title",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text Color",
        "group": "Lobby Title",
        "default": "#FFFFFF",
        "meta": []
      },
      {
        "key": "pop_item_type",
        "prop": "popItemType",
        "type": "select",
        "label": "Pop Item Type",
        "group": "Pop Item Type",
        "default": "balloon",
        "meta": {
          "help": "Choose what users will pop",
          "options": [
            {
              "value": "balloon",
              "label": "Balloon"
            },
            {
              "value": "present",
              "label": "Present"
            },
            {
              "value": "egg",
              "label": "Egg"
            }
          ]
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Background for lobby and game board (uses background color as fallback)"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Banner shown above the game"
        }
      },
      {
        "key": "pop_item_image",
        "prop": "popItemImage",
        "type": "media",
        "label": "Custom Pop Item Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Replaces default balloon/present with custom image"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "pop_sound",
        "prop": "popSound",
        "type": "media",
        "label": "Pop Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "pop_item_colors",
        "prop": "popItemColors",
        "type": "json",
        "label": "Item Colors",
        "group": "Item Colors",
        "default": [
          "#FF4C4C",
          "#FFEB3B",
          "#64B5F6",
          "#81C784",
          "#9575CD",
          "#FF8A80",
          "#FFB74D",
          "#4DD0E1",
          "#F06292",
          "#FFD700"
        ],
        "meta": {
          "help": "Colors for balloons/presents (1-15)",
          "itemDefault": "#FF4C4C",
          "min": 1,
          "max": 15
        }
      },
      {
        "key": "pop_confetti_colors",
        "prop": "popConfettiColors",
        "type": "json",
        "label": "Confetti Colors",
        "group": "Confetti Colors",
        "default": [
          "#FFD700",
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7"
        ],
        "meta": {
          "help": "Win celebration colors (1-10)",
          "itemDefault": "#FFD700",
          "min": 1,
          "max": 10
        }
      },
      {
        "key": "pop_bg_color",
        "prop": "popBgColor",
        "type": "color",
        "label": "Background Color",
        "group": "Theme Colors",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "pop_win_color",
        "prop": "popWinColor",
        "type": "color",
        "label": "Win Color",
        "group": "Theme Colors",
        "default": "#00ff88",
        "meta": []
      },
      {
        "key": "pop_lose_color",
        "prop": "popLoseColor",
        "type": "color",
        "label": "Lose Color",
        "group": "Theme Colors",
        "default": "#ff4444",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary Color",
        "group": "Theme Colors",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "secondary_color",
        "prop": "secondaryColor",
        "type": "color",
        "label": "Secondary Color",
        "group": "Theme Colors",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent Color",
        "group": "Theme Colors",
        "default": "#ffd700",
        "meta": []
      }
    ]
  },
  "football": {
    "key": "football",
    "label": "Football",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": "Use {name} to insert the game name, e.g. \"Welcome to {name}\""
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Beat the keeper to win instant prizes",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Kick Off ⚽",
        "meta": []
      },
      {
        "key": "intro_voice_enabled",
        "prop": "introVoiceEnabled",
        "type": "toggle",
        "label": "Speak welcome aloud (auto voice)",
        "group": "Intro",
        "default": true,
        "meta": {
          "help": "Reads the welcome message using the device voice when no Welcome Sound is uploaded"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro and overrides the spoken welcome"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "classic",
        "meta": {
          "help": "Restyles the pitch, stadium and sky",
          "options": [
            {
              "value": "classic",
              "label": "Classic (Daytime)"
            },
            {
              "value": "night",
              "label": "Night Match"
            },
            {
              "value": "retro",
              "label": "Retro"
            },
            {
              "value": "neon",
              "label": "Neon Arcade"
            }
          ]
        }
      },
      {
        "key": "ball_image",
        "prop": "ballImage",
        "type": "media",
        "label": "Ball Image",
        "group": "Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional custom football art (PNG with transparency)"
        }
      },
      {
        "key": "ball_color",
        "prop": "ballColor",
        "type": "color",
        "label": "Ball Color",
        "group": "Assets",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "goal_color",
        "prop": "goalColor",
        "type": "color",
        "label": "Goal / Net Color",
        "group": "Assets",
        "default": "#eeeeee",
        "meta": []
      },
      {
        "key": "keeper_sheet",
        "prop": "keeperSheet",
        "type": "media",
        "label": "Goalkeeper Sprite Sheet",
        "group": "Animated Characters",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a horizontal PNG strip of equal frames. Frame order: 1) ready, 2) dive LEFT, 3) dive RIGHT. Leave blank for the drawn keeper."
        }
      },
      {
        "key": "keeper_frames",
        "prop": "keeperFrames",
        "type": "number",
        "label": "Keeper Frames",
        "group": "Animated Characters",
        "default": 0,
        "meta": {
          "help": "Leave at 0 to auto-detect (single image = 1 frame, strip = its real frame count). Set a number only to force it. For an animated strip the last two frames should be dive-left and dive-right; the rest are the walk cycle."
        }
      },
      {
        "key": "striker_sheet",
        "prop": "strikerSheet",
        "type": "media",
        "label": "Striker Sprite Sheet",
        "group": "Animated Characters",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a horizontal PNG strip of equal frames. Frame order: 1) stand, 2) run, 3) kick. Leave blank for the drawn striker."
        }
      },
      {
        "key": "striker_frames",
        "prop": "strikerFrames",
        "type": "number",
        "label": "Striker Frames",
        "group": "Animated Characters",
        "default": 0,
        "meta": {
          "help": "Leave at 0 to auto-detect (single image = 1 frame, strip = its real frame count). Set a number only to force it. For an animated strip use 3 frames: 1) stand, 2) run, 3) kick."
        }
      },
      {
        "key": "sprite_chroma",
        "prop": "spriteChroma",
        "type": "toggle",
        "label": "Auto-remove sprite background",
        "group": "Animated Characters",
        "default": false,
        "meta": {
          "help": "Turn on for AI-generated sheets (e.g. Gemini) that come with a solid or checkerboard background instead of real transparency — the game strips it automatically."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Take Your Shot!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "GOAL! You scored!",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "Saved! Unlucky…",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#1b5e20",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffeb3b",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "kick_sound",
        "prop": "kickSound",
        "type": "media",
        "label": "Kick Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "whistle_sound",
        "prop": "whistleSound",
        "type": "media",
        "label": "Whistle Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "crowd_sound",
        "prop": "crowdSound",
        "type": "media",
        "label": "Crowd Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound (cheer)",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": true,
        "meta": []
      },
      {
        "key": "host_enabled",
        "prop": "hostEnabled",
        "type": "toggle",
        "label": "Show Commentator (host + mic)",
        "group": "Display Options",
        "default": true,
        "meta": []
      },
      {
        "key": "host_image",
        "prop": "hostImage",
        "type": "media",
        "label": "Commentator Image",
        "group": "Display Options",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — upload your own host / mascot (PNG, transparent). Defaults to a drawn pundit."
        }
      }
    ]
  },
  "fishing": {
    "key": "fishing",
    "label": "Fishing",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": "Use {name} to insert the game name"
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Cast your line to reel in instant prizes",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Cast Off 🎣",
        "meta": []
      },
      {
        "key": "intro_voice_enabled",
        "prop": "introVoiceEnabled",
        "type": "toggle",
        "label": "Speak welcome aloud (auto voice)",
        "group": "Intro",
        "default": false,
        "meta": {
          "help": "OFF by default. When ON, reads the welcome message aloud using the device voice if no Welcome Sound is uploaded. The uploaded Welcome Sound always plays regardless."
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro and overrides the spoken welcome"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "stormy",
        "meta": {
          "help": "Restyles the sky, sea and lighting",
          "options": [
            {
              "value": "chill",
              "label": "Chill"
            },
            {
              "value": "sunset",
              "label": "Sunset"
            },
            {
              "value": "night",
              "label": "Night Time"
            },
            {
              "value": "stormy",
              "label": "Stormy"
            }
          ]
        }
      },
      {
        "key": "sun_enabled",
        "prop": "sunEnabled",
        "type": "toggle",
        "label": "Show Sun",
        "group": "Look",
        "default": true,
        "meta": []
      },
      {
        "key": "sun_image",
        "prop": "sunImage",
        "type": "media",
        "label": "Sun Image",
        "group": "Look",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — your own sun / moon art (PNG, transparent). Defaults to a drawn sun."
        }
      },
      {
        "key": "clouds_enabled",
        "prop": "cloudsEnabled",
        "type": "toggle",
        "label": "Show Clouds",
        "group": "Look",
        "default": true,
        "meta": []
      },
      {
        "key": "underwater_image",
        "prop": "underwaterImage",
        "type": "media",
        "label": "Underwater Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a full backdrop for the underwater world (reef, deep sea, treasure…). Fish + line animate on top, with a light shimmer over it. The drawn seabed is used when blank."
        }
      },
      {
        "key": "boat_image",
        "prop": "boatImage",
        "type": "media",
        "label": "Boat Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — your own boat art (PNG, transparent). Side-on, hull flat along the bottom edge, no rod/people. Defaults to a drawn boat."
        }
      },
      {
        "key": "boat_waterline",
        "prop": "boatWaterline",
        "type": "number",
        "label": "Boat Waterline (nudge up / down)",
        "group": "Scene Art",
        "default": 0,
        "meta": {
          "help": "Fine-tune where the boat sits on the water. Increase to sink it LOWER into the sea (closes any gap under the hull); decrease to LIFT it. A tightly-cropped boat PNG usually sits right at 0."
        }
      },
      {
        "key": "fisherman_sheet",
        "prop": "fishermanSheet",
        "type": "media",
        "label": "Fisherman Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — fisherman art or a horizontal sprite strip (idle, cast, reel). Defaults to a drawn fisherman."
        }
      },
      {
        "key": "fisherman_frames",
        "prop": "fishermanFrames",
        "type": "number",
        "label": "Fisherman Frames",
        "group": "Scene Art",
        "default": 0,
        "meta": {
          "help": "Leave 0 to auto-detect (single image = 1 frame, strip = its frame count). For an animated strip use 3: 1) idle, 2) cast, 3) reel."
        }
      },
      {
        "key": "fish_image",
        "prop": "fishImage",
        "type": "media",
        "label": "Caught Fish Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the fish shown on a winning catch. Defaults to a drawn fish."
        }
      },
      {
        "key": "sprite_chroma",
        "prop": "spriteChroma",
        "type": "toggle",
        "label": "Auto-remove image background",
        "group": "Scene Art",
        "default": false,
        "meta": {
          "help": "Turn on for AI-generated art (e.g. Gemini) that has a solid/checkerboard background instead of real transparency."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Cast to Win!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "Reeled in a winner! 🎣",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "The one that got away…",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#0277bd",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffd54f",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "cast_sound",
        "prop": "castSound",
        "type": "media",
        "label": "Cast Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "splash_sound",
        "prop": "splashSound",
        "type": "media",
        "label": "Splash Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "reel_sound",
        "prop": "reelSound",
        "type": "media",
        "label": "Reel Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound (catch)",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": false,
        "meta": []
      }
    ]
  },
  "ticketeater": {
    "key": "ticketeater",
    "label": "Ticket Eater",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": "Use {name} to insert the game name"
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Feed your tickets to the monster",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Feed the Eater 👹",
        "meta": []
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "arcade",
        "meta": {
          "help": "Restyles the room, conveyor and lighting",
          "options": [
            {
              "value": "arcade",
              "label": "Arcade (neon)"
            },
            {
              "value": "cave",
              "label": "Cave (lair)"
            },
            {
              "value": "candy",
              "label": "Candy"
            },
            {
              "value": "spooky",
              "label": "Spooky"
            }
          ]
        }
      },
      {
        "key": "mascot_image",
        "prop": "mascotImage",
        "type": "media",
        "label": "Mascot Frame 1 (normal)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a mascot / character (PNG, transparent) that sits above the tickets. This is the normal state (before any win). It lights up + wiggles as wins come in. Separate from the Title image."
        }
      },
      {
        "key": "mascot_image_2",
        "prop": "mascotImage2",
        "type": "media",
        "label": "Mascot Frame 2 (after 1st win)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — swaps in once the first win lands. Falls back to Frame 1 if blank."
        }
      },
      {
        "key": "mascot_image_3",
        "prop": "mascotImage3",
        "type": "media",
        "label": "Mascot Frame 3 (3+ wins)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — swaps in once 3 wins land in the same game. Falls back to Frame 2 if blank."
        }
      },
      {
        "key": "ticket_image",
        "prop": "ticketImage",
        "type": "media",
        "label": "Main Ticket Image (the reader)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the big reader ticket in the middle (PNG, transparent). The rolling number is drawn on top. Defaults to a clean drawn ticket."
        }
      },
      {
        "key": "rising_ticket_image",
        "prop": "risingTicketImage",
        "type": "media",
        "label": "Rising Ticket Image (the ones going in)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the small tickets that flow up into the reader (PNG, transparent). Shown rotated vertical. Defaults to a drawn ticket. Use a different design from the main ticket."
        }
      },
      {
        "key": "background_image",
        "prop": "backgroundImage",
        "type": "media",
        "label": "Background Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a full backdrop behind the ticket. The drawn themed background is used when blank."
        }
      },
      {
        "key": "pouch_image",
        "prop": "pouchImage",
        "type": "media",
        "label": "Pouch / Inventory Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the pouch that won prizes drop into (PNG, transparent). Defaults to a drawn pouch."
        }
      },
      {
        "key": "prize_image",
        "prop": "prizeImage",
        "type": "media",
        "label": "Fallback Prize Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Only used if a winning instant-win has NO image of its own — the win reveal normally shows the real competition instant-win image. Defaults to a trophy."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Feed the Eater!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "Yum! It coughed up a prize! 🎉",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "Gulp… nothing that time",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#6c5ce7",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffd54f",
        "meta": []
      },
      {
        "key": "number_color",
        "prop": "numberColor",
        "type": "color",
        "label": "Ticket Number Colour",
        "group": "Colors",
        "default": "",
        "meta": {
          "help": "Colour of the rolling ticket number. Leave blank to use the theme colour."
        }
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "feed_sound",
        "prop": "feedSound",
        "type": "media",
        "label": "Feed Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "chomp_sound",
        "prop": "chompSound",
        "type": "media",
        "label": "Chomp Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "gulp_sound",
        "prop": "gulpSound",
        "type": "media",
        "label": "Gulp Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "collect_sound",
        "prop": "collectSound",
        "type": "media",
        "label": "Collect Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a won prize is collected into the pouch"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": false,
        "meta": []
      }
    ]
  }
};

export function schemaFor(key) { return (STUDIO_SCHEMAS[key] && STUDIO_SCHEMAS[key].schema) || []; }

export function defaultsFor(key) {
    const out = {};
    for (const f of schemaFor(key)) out[f.key] = f.default;
    return out;
}

/** { [prop]: value } for the player component, from a config keyed by field key. */
export function assetsFor(key, config) {
    const out = {};
    const cfg = config || {};
    for (const f of schemaFor(key)) out[f.prop] = cfg[f.key] !== undefined ? cfg[f.key] : f.default;
    return out;
}
