export class SampleDataDTO {
    id: number;
    name: string|null;
    language: string|null;
    country: string|null;
    gameName: string;
    bought: boolean;
    bankBalance: number;
    rating: number;
    totalWinnings: number;

}

export default class SampleData {
    static rowData = [
        {
            id: 1,
            name: "Tony Smith",
            language: "English",
            country: "United Kingdom",
            gameName: "Go",
            bought: true,
            bankBalance: 20000,
            rating: 4,
            totalWinnings: 200
        },
        {
            id: 2,
            name: "Andrew Connell",
            language: "Swedish",
            country: "Sweden",
            gameName: "Bul",
            bought: true,
            bankBalance: 2397,
            rating: 2,
            totalWinnings: 481
        },
        {
            id: 3,
            name: "Kevin Flanagan",
            language: "Spanish",
            country: "Uruguay",
            gameName: "Rithmomachy",
            bought: false,
            bankBalance: 2397,
            rating: 0,
            totalWinnings: -222
        },
        {
            id: 4,
            name: "Bricker McGee",
            language: "French",
            country: "France",
            gameName: "Kalah",
            bought: false,
            bankBalance: 75701,
            rating: 3,
            totalWinnings: -2090
        },
        {
            id: 5,
            name: "Dimple Unalkat",
            language: "French",
            country: "France",
            gameName: "Go",
            bought: true,
            bankBalance: 85310,
            rating: 5,
            totalWinnings: 563168
        },
        {
            id: 6,
            name: "Gil Lopes",
            language: "Spanish",
            country: "Colombia",
            gameName: "Hare and Hounds",
            bought: true,
            bankBalance: 65506,
            rating: 4,
            totalWinnings: -7440
        },
        {
            id: 7,
            name: "Sophie Beckham",
            language: "English",
            country: "Ireland",
            gameName: "Chess",
            bought: false,
            bankBalance: 32835,
            rating: 2,
            totalWinnings: 7274
        },
        {
            id: 8,
            name: "Emily Braxton",
            language: "Maltese",
            country: "Malta",
            gameName: "Blockade",
            bought: true,
            bankBalance: 622755,
            rating: 4,
            totalWinnings: 4057
        },
        {
            id: 9,
            name: "Lily Brock",
            language: "Italian",
            country: "Italy",
            gameName: "YINSH",
            bought: false,
            bankBalance: 563168,
            rating: 5,
            totalWinnings: 7440
        },
        {
            id: 10,
            name: "Charlotte Cole",
            language: "French",
            country: "France",
            gameName: "Bul",
            bought: false,
            bankBalance: 32835,
            rating: 1,
            totalWinnings: -12
        },
        {
            id: 11,
            name: "Isla Fletcher",
            language: "Norwegian",
            country: "Norway",
            gameName: "Othello",
            bought: true,
            bankBalance: 53263,
            rating: 2,
            totalWinnings: 12456
        },
        {
            id: 12,
            name: "Kevin Hudson",
            language: "German",
            country: "Germany",
            gameName: "Stratego",
            bought: false,
            bankBalance: 4890,
            rating: 1,
            totalWinnings: -585
        },
    ]
}
