/*
 Navicat MySQL Data Transfer

 Source Server         : aws_fryspro_produccion
 Source Server Type    : MySQL
 Source Server Version : 80045 (8.0.45)
 Source Host           : 3.227.219.71:3306
 Source Schema         : frys_db

 Target Server Type    : MySQL
 Target Server Version : 80045 (8.0.45)
 File Encoding         : 65001

 Date: 29/05/2026 03:55:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alembic_version
-- ----------------------------
DROP TABLE IF EXISTS `alembic_version`;
CREATE TABLE `alembic_version`  (
  `version_num` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`version_num`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of alembic_version
-- ----------------------------
INSERT INTO `alembic_version` VALUES ('3cafdb40cd7b');

-- ----------------------------
-- Table structure for colores
-- ----------------------------
DROP TABLE IF EXISTS `colores`;
CREATE TABLE `colores`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_colores_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of colores
-- ----------------------------
INSERT INTO `colores` VALUES (4, 'Amarillo');
INSERT INTO `colores` VALUES (2, 'Azul');
INSERT INTO `colores` VALUES (3, 'Blanco');
INSERT INTO `colores` VALUES (10, 'Gris');
INSERT INTO `colores` VALUES (8, 'Morado');
INSERT INTO `colores` VALUES (9, 'Naranjo');
INSERT INTO `colores` VALUES (5, 'Negro');
INSERT INTO `colores` VALUES (6, 'Rojo');
INSERT INTO `colores` VALUES (1, 'Transparente');
INSERT INTO `colores` VALUES (7, 'Verde');

-- ----------------------------
-- Table structure for detalle_produccion_extrusora
-- ----------------------------
DROP TABLE IF EXISTS `detalle_produccion_extrusora`;
CREATE TABLE `detalle_produccion_extrusora`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `produccion_extrusora_id` int NOT NULL,
  `kg` float NOT NULL,
  `numero_rollo` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `produccion_extrusora_id`(`produccion_extrusora_id` ASC) USING BTREE,
  INDEX `ix_detalle_produccion_extrusora_id`(`id` ASC) USING BTREE,
  CONSTRAINT `detalle_produccion_extrusora_ibfk_1` FOREIGN KEY (`produccion_extrusora_id`) REFERENCES `produccion_extrusora` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 642 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_produccion_extrusora
-- ----------------------------
INSERT INTO `detalle_produccion_extrusora` VALUES (44, 17, 91, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (45, 17, 97, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (46, 17, 83, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (49, 17, 104, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (50, 17, 89, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (51, 17, 119, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (60, 22, 90, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (61, 22, 110, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (63, 23, 90, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (64, 23, 89, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (65, 23, 94, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (66, 23, 37, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (67, 24, 56, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (68, 24, 63, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (69, 24, 62, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (70, 24, 64, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (71, 25, 104, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (72, 24, 57, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (73, 24, 52, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (74, 25, 96, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (75, 24, 49, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (76, 25, 104, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (77, 24, 48, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (78, 25, 96, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (79, 26, 97, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (80, 26, 118, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (81, 26, 105, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (82, 26, 68, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (83, 27, 125, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (84, 27, 125, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (85, 27, 132, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (86, 27, 165, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (87, 28, 118, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (88, 28, 104, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (89, 28, 100, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (90, 28, 100, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (91, 28, 107, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (92, 28, 113, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (93, 29, 64, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (94, 30, 32, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (95, 31, 32.6, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (96, 32, 119.2, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (97, 31, 38.3, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (98, 31, 36, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (99, 31, 38, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (101, 31, 43, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (102, 31, 26, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (103, 32, 137, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (104, 31, 37, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (105, 31, 43, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (106, 31, 44, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (107, 32, 170, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (108, 31, 32, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (109, 32, 116, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (110, 33, 110, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (111, 33, 103, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (112, 33, 102, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (113, 33, 108, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (114, 33, 115, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (115, 33, 67, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (116, 34, 113, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (117, 34, 131, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (118, 34, 116, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (119, 34, 158, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (120, 35, 114, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (121, 35, 118, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (122, 35, 107, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (123, 35, 93, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (124, 36, 116, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (125, 36, 64, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (126, 37, 145, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (127, 37, 144, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (130, 37, 120, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (131, 35, 104, 20);
INSERT INTO `detalle_produccion_extrusora` VALUES (132, 38, 98, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (133, 38, 98, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (134, 38, 90, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (135, 38, 105, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (136, 38, 111, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (137, 38, 100, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (138, 39, 81, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (139, 39, 88, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (140, 40, 52, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (141, 41, 73, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (142, 42, 76, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (143, 42, 83, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (144, 42, 92, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (145, 42, 71, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (146, 43, 88, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (147, 43, 96, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (148, 43, 89, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (149, 43, 97, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (150, 43, 72, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (151, 44, 83, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (152, 44, 79, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (153, 44, 77, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (154, 44, 84, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (155, 44, 108, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (161, 46, 100, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (162, 46, 59, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (163, 45, 96, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (164, 45, 93, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (165, 45, 95, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (166, 48, 83, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (167, 48, 40, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (168, 49, 92, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (169, 50, 40, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (170, 50, 43, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (171, 50, 41, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (172, 50, 40, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (173, 50, 43, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (174, 52, 38, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (175, 52, 41, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (176, 52, 38, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (177, 52, 39, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (178, 53, 47, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (179, 53, 42, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (180, 53, 43, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (181, 53, 46, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (182, 53, 39, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (183, 53, 30, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (184, 54, 119, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (185, 54, 108, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (186, 54, 106, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (187, 54, 95, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (188, 56, 115, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (189, 54, 15, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (190, 57, 107, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (191, 58, 102, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (192, 59, 63, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (193, 60, 76, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (194, 60, 94, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (195, 60, 40, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (196, 61, 68, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (197, 62, 94, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (198, 62, 62, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (199, 63, 92, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (200, 64, 29, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (201, 63, 102, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (202, 64, 31, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (203, 65, 124, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (204, 64, 30, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (205, 65, 99, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (206, 66, 40, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (207, 67, 113, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (208, 66, 42, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (209, 67, 111, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (210, 68, 26, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (211, 67, 101, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (212, 68, 32, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (213, 69, 55, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (214, 68, 26, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (215, 69, 54, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (216, 71, 28, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (217, 70, 67, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (218, 71, 29, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (219, 70, 65, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (220, 70, 20, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (221, 71, 27, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (222, 72, 140, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (223, 71, 26, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (224, 72, 110, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (225, 71, 36, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (226, 71, 30, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (227, 72, 95, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (228, 73, 30, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (229, 74, 102, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (230, 74, 108, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (231, 73, 41, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (232, 74, 85, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (233, 73, 48, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (234, 74, 112, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (235, 74, 73, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (236, 73, 47, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (237, 75, 100, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (238, 75, 120, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (239, 75, 115, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (240, 75, 77, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (241, 76, 105, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (242, 76, 104, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (243, 76, 108, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (244, 76, 96, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (245, 76, 75, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (246, 76, 93, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (247, 76, 72, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (248, 77, 105, 20);
INSERT INTO `detalle_produccion_extrusora` VALUES (249, 77, 110, 21);
INSERT INTO `detalle_produccion_extrusora` VALUES (250, 77, 98, 22);
INSERT INTO `detalle_produccion_extrusora` VALUES (251, 77, 112, 23);
INSERT INTO `detalle_produccion_extrusora` VALUES (252, 78, 96, 24);
INSERT INTO `detalle_produccion_extrusora` VALUES (253, 78, 105, 25);
INSERT INTO `detalle_produccion_extrusora` VALUES (255, 80, 27, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (256, 78, 103, 26);
INSERT INTO `detalle_produccion_extrusora` VALUES (257, 79, 28, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (258, 79, 29, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (259, 81, 25, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (260, 81, 20, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (261, 81, 23, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (262, 81, 28, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (263, 81, 26, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (264, 81, 22, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (265, 81, 25, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (266, 82, 26, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (267, 82, 31, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (268, 82, 26, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (269, 82, 28, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (270, 83, 85, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (271, 78, 107, 27);
INSERT INTO `detalle_produccion_extrusora` VALUES (272, 78, 100, 28);
INSERT INTO `detalle_produccion_extrusora` VALUES (273, 85, 91, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (274, 85, 105, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (275, 86, 117, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (276, 86, 138, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (277, 86, 112, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (278, 87, 109, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (279, 87, 117, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (280, 88, 123, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (281, 88, 80, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (282, 89, 102, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (283, 89, 78, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (284, 89, 115, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (285, 90, 96, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (286, 90, 70, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (287, 90, 109, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (288, 84, 126, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (289, 83, 117, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (290, 91, 24, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (291, 84, 130, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (292, 83, 126, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (293, 91, 28, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (294, 91, 24, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (295, 84, 118, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (296, 83, 108, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (297, 91, 23, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (298, 83, 129, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (299, 84, 125, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (300, 91, 26, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (301, 91, 29, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (302, 83, 110, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (303, 84, 103, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (304, 92, 29, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (305, 93, 109, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (306, 94, 102, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (307, 95, 20, 20);
INSERT INTO `detalle_produccion_extrusora` VALUES (308, 93, 109, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (309, 94, 87, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (310, 96, 31, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (311, 97, 35, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (312, 93, 106, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (313, 97, 38, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (314, 96, 32, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (315, 97, 34, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (316, 93, 109, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (317, 97, 39, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (318, 96, 31, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (319, 97, 33, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (320, 93, 101, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (321, 97, 30, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (322, 96, 27, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (323, 93, 62, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (324, 97, 30, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (325, 99, 61, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (326, 98, 36, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (327, 99, 49, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (328, 98, 30, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (329, 99, 52, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (330, 100, 33, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (331, 98, 29, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (332, 100, 33, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (333, 98, 30, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (334, 101, 70, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (335, 102, 90, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (336, 102, 80, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (337, 101, 69, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (338, 103, 33, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (339, 102, 90, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (340, 101, 91, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (341, 103, 35, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (342, 102, 90, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (343, 103, 28, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (344, 101, 82, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (345, 102, 102, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (346, 103, 27, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (347, 104, 105, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (348, 106, 85, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (349, 105, 34, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (350, 104, 101, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (351, 105, 30, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (352, 106, 82, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (353, 104, 130, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (354, 105, 32, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (355, 106, 87, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (356, 105, 33, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (357, 104, 117, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (358, 106, 77, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (359, 104, 124, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (360, 106, 61, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (361, 107, 100, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (362, 108, 25, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (363, 109, 78, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (364, 108, 25, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (365, 110, 93, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (366, 109, 82, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (367, 108, 26, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (368, 109, 75, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (369, 108, 26, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (370, 112, 92, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (371, 110, 65, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (372, 108, 26, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (373, 112, 94, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (374, 109, 94, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (375, 108, 25, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (376, 112, 105, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (377, 109, 73, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (378, 115, 26, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (379, 114, 87, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (380, 116, 76, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (381, 115, 27, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (382, 114, 118, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (383, 117, 65, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (384, 116, 42, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (385, 118, 22, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (386, 119, 101, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (387, 118, 20, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (388, 119, 48, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (389, 118, 23, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (390, 120, 118, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (391, 119, 115, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (392, 118, 20, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (393, 119, 85, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (394, 120, 110, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (395, 118, 24, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (396, 119, 87, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (397, 118, 26, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (398, 121, 122, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (399, 119, 122, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (400, 122, 24, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (401, 121, 109, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (402, 122, 22, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (403, 123, 65, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (404, 121, 91, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (405, 122, 26, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (406, 124, 75, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (407, 122, 24, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (408, 125, 59, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (409, 125, 62, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (410, 122, 25, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (411, 126, 70, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (412, 125, 60, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (413, 122, 22, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (414, 127, 67, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (415, 128, 23, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (416, 127, 53, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (417, 127, 60, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (418, 129, 122, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (419, 130, 46, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (420, 127, 60, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (421, 127, 61, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (422, 129, 150, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (423, 130, 43, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (424, 131, 36, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (425, 129, 127, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (426, 131, 36, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (427, 130, 31, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (428, 131, 36, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (429, 129, 100, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (430, 132, 32, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (431, 133, 30, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (432, 132, 31, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (434, 132, 31, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (435, 133, 31, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (436, 134, 113, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (437, 134, 70, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (438, 132, 30, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (439, 132, 34, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (440, 133, 30, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (441, 135, 106, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (442, 132, 34, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (443, 135, 80, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (444, 136, 102, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (445, 135, 105, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (446, 136, 102, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (447, 135, 81, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (448, 136, 95, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (449, 135, 99, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (450, 135, 91, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (451, 135, 97, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (452, 135, 54, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (453, 135, 61, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (454, 137, 88, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (456, 137, 79, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (457, 138, 92, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (458, 138, 92, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (459, 137, 67, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (460, 138, 104, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (461, 140, 106, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (462, 138, 91, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (463, 142, 105, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (464, 141, 113, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (465, 142, 133, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (466, 141, 107, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (467, 142, 90, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (468, 144, 108, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (469, 143, 90, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (470, 144, 99, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (471, 143, 96, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (472, 144, 120, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (473, 143, 115, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (474, 144, 102, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (475, 145, 44, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (476, 144, 94, 20);
INSERT INTO `detalle_produccion_extrusora` VALUES (477, 146, 105, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (478, 144, 90, 21);
INSERT INTO `detalle_produccion_extrusora` VALUES (479, 147, 116, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (480, 148, 122, 22);
INSERT INTO `detalle_produccion_extrusora` VALUES (481, 147, 108, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (482, 147, 87, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (483, 149, 110, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (484, 149, 130, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (485, 147, 135, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (486, 149, 122, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (487, 150, 50, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (488, 149, 122, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (489, 150, 34, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (490, 151, 55, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (491, 152, 109, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (492, 151, 45, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (493, 151, 51, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (494, 152, 104, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (495, 153, 54, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (496, 152, 106, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (497, 152, 96, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (498, 153, 41, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (499, 152, 54, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (500, 153, 33, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (501, 152, 90, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (502, 155, 109, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (503, 154, 52, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (504, 155, 130, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (505, 154, 53, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (506, 155, 135, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (507, 156, 33, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (508, 158, 45, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (509, 160, 126, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (510, 161, 101, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (511, 158, 51, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (512, 161, 104, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (513, 161, 101, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (514, 158, 49, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (515, 161, 95, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (516, 161, 97, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (517, 163, 49, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (518, 162, 107, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (519, 163, 48, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (520, 162, 112, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (521, 163, 49, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (522, 162, 140, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (523, 163, 25, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (524, 162, 130, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (525, 162, 87, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (526, 164, 109, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (527, 165, 46, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (528, 164, 108, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (529, 164, 101, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (530, 165, 50, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (531, 164, 105, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (532, 165, 48, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (533, 164, 113, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (534, 166, 40, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (535, 167, 97, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (536, 167, 112, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (537, 167, 64, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (538, 166, 50, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (539, 168, 70, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (540, 170, 41, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (541, 169, 107, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (542, 169, 125, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (543, 170, 33, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (544, 169, 113, 20);
INSERT INTO `detalle_produccion_extrusora` VALUES (545, 170, 30, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (546, 169, 105, 21);
INSERT INTO `detalle_produccion_extrusora` VALUES (547, 169, 90, 22);
INSERT INTO `detalle_produccion_extrusora` VALUES (548, 171, 105, 23);
INSERT INTO `detalle_produccion_extrusora` VALUES (549, 171, 100, 24);
INSERT INTO `detalle_produccion_extrusora` VALUES (550, 172, 108, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (551, 172, 109, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (552, 172, 114, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (553, 173, 132, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (554, 173, 124, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (555, 173, 103, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (556, 173, 100, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (557, 174, 107, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (558, 174, 98, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (559, 174, 104, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (560, 174, 92, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (561, 174, 57, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (562, 175, 83, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (563, 176, 120, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (564, 177, 90, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (565, 176, 132, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (566, 177, 74, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (567, 177, 53, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (568, 176, 120, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (569, 179, 55, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (570, 178, 130, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (571, 179, 42, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (572, 178, 140, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (573, 179, 48, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (574, 179, 41, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (575, 179, 23, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (576, 178, 112, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (577, 180, 82, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (578, 181, 149, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (579, 180, 82, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (580, 181, 156, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (581, 180, 40, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (582, 182, 94, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (583, 183, 92, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (584, 182, 99, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (585, 183, 64, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (586, 182, 116, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (587, 183, 66, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (588, 184, 120, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (589, 185, 80, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (590, 184, 108, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (591, 185, 78, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (592, 184, 114, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (593, 184, 112, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (594, 185, 98, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (595, 184, 101, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (596, 185, 68, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (597, 186, 101, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (598, 187, 87, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (599, 186, 108, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (600, 187, 51, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (601, 186, 97, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (602, 187, 56, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (603, 186, 102, 12);
INSERT INTO `detalle_produccion_extrusora` VALUES (604, 188, 90, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (605, 186, 100, 13);
INSERT INTO `detalle_produccion_extrusora` VALUES (606, 189, 81, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (607, 186, 90, 14);
INSERT INTO `detalle_produccion_extrusora` VALUES (608, 190, 44, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (609, 191, 102, 15);
INSERT INTO `detalle_produccion_extrusora` VALUES (610, 190, 45, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (611, 191, 116, 16);
INSERT INTO `detalle_produccion_extrusora` VALUES (612, 190, 52, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (613, 190, 60, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (614, 191, 132, 17);
INSERT INTO `detalle_produccion_extrusora` VALUES (615, 190, 42, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (616, 190, 41, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (617, 191, 120, 18);
INSERT INTO `detalle_produccion_extrusora` VALUES (618, 192, 39, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (619, 190, 37, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (620, 191, 90, 19);
INSERT INTO `detalle_produccion_extrusora` VALUES (621, 193, 50, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (622, 194, 96, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (623, 193, 56, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (624, 193, 36, 10);
INSERT INTO `detalle_produccion_extrusora` VALUES (625, 194, 105, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (626, 193, 39, 11);
INSERT INTO `detalle_produccion_extrusora` VALUES (627, 194, 99, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (628, 195, 37, 1);
INSERT INTO `detalle_produccion_extrusora` VALUES (629, 195, 43, 2);
INSERT INTO `detalle_produccion_extrusora` VALUES (630, 195, 44, 3);
INSERT INTO `detalle_produccion_extrusora` VALUES (631, 194, 112, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (632, 195, 42, 4);
INSERT INTO `detalle_produccion_extrusora` VALUES (633, 194, 107, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (634, 195, 41, 5);
INSERT INTO `detalle_produccion_extrusora` VALUES (635, 196, 45, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (636, 197, 97, 6);
INSERT INTO `detalle_produccion_extrusora` VALUES (637, 196, 60, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (638, 198, 125, 7);
INSERT INTO `detalle_produccion_extrusora` VALUES (639, 198, 108, 8);
INSERT INTO `detalle_produccion_extrusora` VALUES (640, 198, 110, 9);
INSERT INTO `detalle_produccion_extrusora` VALUES (641, 199, 122, 1);

-- ----------------------------
-- Table structure for empresas
-- ----------------------------
DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_empresa` enum('cliente','proveedor') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rut` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `razon_social` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_empresas_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of empresas
-- ----------------------------
INSERT INTO `empresas` VALUES (4, 'cliente', 'Los Arrallanes SPA.', '77096742-2', 'Los Arrallanes SPA.', 'inmaculada 628 Puerto Montt', '652-829759', 1);
INSERT INTO `empresas` VALUES (5, 'proveedor', 'TOPCOLOR', NULL, 'TOPCOLOR', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (6, 'cliente', 'comercial EKS Ltda.', '77983420-4', 'comercial EKS Ltda', 'Vicente Perez Rosales 153', NULL, 1);
INSERT INTO `empresas` VALUES (7, 'cliente', 'COMERCIAL FRYS', '76.386.703-K', 'COM FRYS LTDA', 'COMERCIAL FRYS', NULL, 1);
INSERT INTO `empresas` VALUES (8, 'cliente', 'Exmoss', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (9, 'cliente', 'PLASTICOS AUSTRAL SPA', '76089299-8', 'PLASTICOS AUSTRAL SPA', 'PARCELA 22 ALTO LA PALOMA  PUERTO MONTT', NULL, 1);
INSERT INTO `empresas` VALUES (10, 'proveedor', 'POLYFIBRA', NULL, 'POLYFIBRA', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (11, 'proveedor', 'WINPACK', NULL, 'WINPACK', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (12, 'cliente', 'Proyecta corp', '96816720-0', 'Proyecta corp', 'Av. del Valle 945 of 3611 - Huechuraba', '652554090', 1);
INSERT INTO `empresas` VALUES (13, 'cliente', 'DLC Soluciones de packaging spa.', '76119152-7', NULL, 'V 505 Kilometro 3.5 s/n sector la vara Puerto Montt', '56992188110', 1);
INSERT INTO `empresas` VALUES (15, 'cliente', 'Adelmar', '76386703-k', 'Abastecedora de productos del mar spa', 'El Director 6000 Las Condes Santiago', '56964665226', 1);
INSERT INTO `empresas` VALUES (16, 'cliente', 'Fae', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (17, 'cliente', 'VYS Vivos spa', '76303967-6', 'VYS Vivos spa', 'Camino Chinquihue km 8 s/n ', '56930061288', 1);
INSERT INTO `empresas` VALUES (18, 'cliente', 'MAR LEBU', NULL, 'MAR LEBU', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (19, 'cliente', 'SOC. PESQUERA SAN FERNANDO', '78841220-7', 'SOC. PESQUERA SAN FERNANDO', 'AV. PDTE. KENNEDY 5488 OF.303 VITACURA SANTIAGO ', NULL, 1);
INSERT INTO `empresas` VALUES (20, 'cliente', 'FAO MAR', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (21, 'cliente', 'ASTILLA', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (22, 'cliente', 'POLO SUR', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (23, 'cliente', 'Floridor del Carmen', NULL, 'Floridor del Carmen', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (24, 'proveedor', 'EXCEDENTES PLASTICOS FRANCISCO BARRIOS ', NULL, 'COM EXCEDENTES PLASTICOS', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (25, 'cliente', 'SERVICIOS DE SANEAMIENTO JAAMSANI LIMITADA', NULL, 'SERV DE SANIAMIENTO', 'LOS ALGARROBOS 5006 PUERTO MONTT', NULL, 1);
INSERT INTO `empresas` VALUES (26, 'cliente', 'Cutter', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (27, 'cliente', 'CHULIN', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (28, 'cliente', 'EMPAQUE FRYS', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (29, 'cliente', 'PATAGONES', NULL, 'PESQUERA PATAGONES', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (30, 'cliente', 'Miranda', NULL, NULL, NULL, NULL, 1);
INSERT INTO `empresas` VALUES (31, 'cliente', 'EXPORTFISH', NULL, 'EXPORTFISH', NULL, NULL, 1);
INSERT INTO `empresas` VALUES (32, 'cliente', 'BLUE SEA', NULL, 'BLUE SEA', NULL, NULL, 1);

-- ----------------------------
-- Table structure for maquinas
-- ----------------------------
DROP TABLE IF EXISTS `maquinas`;
CREATE TABLE `maquinas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url_foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `tipo_maquina_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tipo_maquina_id`(`tipo_maquina_id` ASC) USING BTREE,
  INDEX `ix_maquinas_id`(`id` ASC) USING BTREE,
  CONSTRAINT `maquinas_ibfk_1` FOREIGN KEY (`tipo_maquina_id`) REFERENCES `tipo_maquinas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maquinas
-- ----------------------------
INSERT INTO `maquinas` VALUES (1, 'Extrusora1', '', 1);
INSERT INTO `maquinas` VALUES (2, 'Extrusora2', '', 1);
INSERT INTO `maquinas` VALUES (3, 'Extrusora3', '', 1);
INSERT INTO `maquinas` VALUES (4, 'Selladora 1', '', 2);
INSERT INTO `maquinas` VALUES (5, 'Selladora 2', '', 2);
INSERT INTO `maquinas` VALUES (6, 'selladora 3', '', 2);
INSERT INTO `maquinas` VALUES (7, 'Laminadora', '', 2);
INSERT INTO `maquinas` VALUES (8, 'Selladora 4', '', 2);
INSERT INTO `maquinas` VALUES (9, 'Selladora 5', '', 2);

-- ----------------------------
-- Table structure for materia_prima
-- ----------------------------
DROP TABLE IF EXISTS `materia_prima`;
CREATE TABLE `materia_prima`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `empresa_id` int NOT NULL,
  `oc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `factura` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `empresa_id`(`empresa_id` ASC) USING BTREE,
  INDEX `ix_materia_prima_id`(`id` ASC) USING BTREE,
  CONSTRAINT `materia_prima_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of materia_prima
-- ----------------------------
INSERT INTO `materia_prima` VALUES (3, '2026-04-09', 10, '040826', '274923');
INSERT INTO `materia_prima` VALUES (4, '2026-04-09', 10, '040826', '274923');
INSERT INTO `materia_prima` VALUES (5, '2026-04-13', 5, '041326', '319969');
INSERT INTO `materia_prima` VALUES (6, '2026-04-15', 11, '041026', '444509');
INSERT INTO `materia_prima` VALUES (7, '2026-04-17', 5, '041626', '320096');
INSERT INTO `materia_prima` VALUES (8, '2026-04-20', 10, '041626', '275163');
INSERT INTO `materia_prima` VALUES (9, '2026-04-27', 10, '042326', '275327');
INSERT INTO `materia_prima` VALUES (10, '2026-04-29', 5, '042726', '320347');
INSERT INTO `materia_prima` VALUES (11, '2026-05-04', 24, '042726', '1775');
INSERT INTO `materia_prima` VALUES (12, '2026-05-05', 5, '050426', '320446');
INSERT INTO `materia_prima` VALUES (13, '2026-05-11', 24, '050826', '1777');
INSERT INTO `materia_prima` VALUES (14, '2026-05-07', 10, '050526', '275637');
INSERT INTO `materia_prima` VALUES (15, '2026-05-12', 5, '051126', '320620');
INSERT INTO `materia_prima` VALUES (16, '2026-05-07', 10, '050526', '275637');
INSERT INTO `materia_prima` VALUES (17, '2026-05-25', 24, '052026', NULL);
INSERT INTO `materia_prima` VALUES (18, '2026-05-25', 11, '052026', '446190');
INSERT INTO `materia_prima` VALUES (19, '2026-05-15', 10, '051526', '275836');
INSERT INTO `materia_prima` VALUES (20, '2026-05-15', 10, '051526', '275836');
INSERT INTO `materia_prima` VALUES (21, '2026-05-19', 5, '051926', '320797');

-- ----------------------------
-- Table structure for materia_prima_detalle
-- ----------------------------
DROP TABLE IF EXISTS `materia_prima_detalle`;
CREATE TABLE `materia_prima_detalle`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `mp_id` int NOT NULL,
  `mp_tipo_id` int NOT NULL,
  `color_id` int NOT NULL,
  `kg` float NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `color_id`(`color_id` ASC) USING BTREE,
  INDEX `mp_id`(`mp_id` ASC) USING BTREE,
  INDEX `mp_tipo_id`(`mp_tipo_id` ASC) USING BTREE,
  INDEX `ix_materia_prima_detalle_id`(`id` ASC) USING BTREE,
  CONSTRAINT `materia_prima_detalle_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colores` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `materia_prima_detalle_ibfk_2` FOREIGN KEY (`mp_id`) REFERENCES `materia_prima` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `materia_prima_detalle_ibfk_3` FOREIGN KEY (`mp_tipo_id`) REFERENCES `materia_prima_tipo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of materia_prima_detalle
-- ----------------------------
INSERT INTO `materia_prima_detalle` VALUES (4, 3, 1, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (5, 4, 2, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (6, 5, 1, 3, 150);
INSERT INTO `materia_prima_detalle` VALUES (7, 6, 5, 3, 3000);
INSERT INTO `materia_prima_detalle` VALUES (8, 7, 1, 4, 50);
INSERT INTO `materia_prima_detalle` VALUES (9, 7, 1, 2, 100);
INSERT INTO `materia_prima_detalle` VALUES (10, 7, 1, 6, 50);
INSERT INTO `materia_prima_detalle` VALUES (11, 8, 2, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (12, 8, 3, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (13, 9, 1, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (14, 9, 2, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (15, 10, 1, 3, 150);
INSERT INTO `materia_prima_detalle` VALUES (16, 10, 1, 6, 100);
INSERT INTO `materia_prima_detalle` VALUES (17, 11, 1, 1, 3000);
INSERT INTO `materia_prima_detalle` VALUES (18, 12, 1, 3, 100);
INSERT INTO `materia_prima_detalle` VALUES (19, 13, 1, 1, 3000);
INSERT INTO `materia_prima_detalle` VALUES (20, 13, 1, 5, 1000);
INSERT INTO `materia_prima_detalle` VALUES (21, 14, 2, 1, 2500);
INSERT INTO `materia_prima_detalle` VALUES (22, 15, 1, 4, 50);
INSERT INTO `materia_prima_detalle` VALUES (23, 16, 1, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (24, 17, 1, 1, 3000);
INSERT INTO `materia_prima_detalle` VALUES (25, 18, 1, 3, 3500);
INSERT INTO `materia_prima_detalle` VALUES (26, 19, 1, 1, 2000);
INSERT INTO `materia_prima_detalle` VALUES (27, 20, 2, 1, 2500);
INSERT INTO `materia_prima_detalle` VALUES (28, 21, 1, 4, 100);
INSERT INTO `materia_prima_detalle` VALUES (29, 21, 1, 2, 100);
INSERT INTO `materia_prima_detalle` VALUES (30, 21, 1, 6, 50);

-- ----------------------------
-- Table structure for materia_prima_tipo
-- ----------------------------
DROP TABLE IF EXISTS `materia_prima_tipo`;
CREATE TABLE `materia_prima_tipo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_materia_prima_tipo_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of materia_prima_tipo
-- ----------------------------
INSERT INTO `materia_prima_tipo` VALUES (3, 'Alta');
INSERT INTO `materia_prima_tipo` VALUES (1, 'Baja');
INSERT INTO `materia_prima_tipo` VALUES (2, 'Lineal');
INSERT INTO `materia_prima_tipo` VALUES (6, 'Rec Natural');
INSERT INTO `materia_prima_tipo` VALUES (5, 'Rec. BCO');
INSERT INTO `materia_prima_tipo` VALUES (4, 'Uso Pesado');

-- ----------------------------
-- Table structure for op_selladora
-- ----------------------------
DROP TABLE IF EXISTS `op_selladora`;
CREATE TABLE `op_selladora`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `empresa_id` int NULL DEFAULT NULL,
  `producto_id` int NOT NULL,
  `color_id` int NOT NULL,
  `ancho` float NOT NULL,
  `espesor` float NOT NULL,
  `largo` float NOT NULL,
  `unidades` int NOT NULL,
  `kilos` float NOT NULL,
  `estado` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `color_id`(`color_id` ASC) USING BTREE,
  INDEX `empresa_id`(`empresa_id` ASC) USING BTREE,
  INDEX `producto_id`(`producto_id` ASC) USING BTREE,
  INDEX `ix_op_selladora_id`(`id` ASC) USING BTREE,
  CONSTRAINT `op_selladora_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colores` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `op_selladora_ibfk_2` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `op_selladora_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of op_selladora
-- ----------------------------
INSERT INTO `op_selladora` VALUES (3, '2026-04-01', 4, 4, 1, 130, 20, 100, 33000, 800, 'completada');
INSERT INTO `op_selladora` VALUES (4, '2026-04-02', 8, 11, 1, 62, 70, 90, 6000, 436, 'completada');
INSERT INTO `op_selladora` VALUES (6, '2026-04-06', 7, 5, 3, 80, 20, 195, 37000, 2000, 'completada');
INSERT INTO `op_selladora` VALUES (8, '2026-04-07', 6, 6, 3, 58, 25, 85, 13500, 10, 'completada');
INSERT INTO `op_selladora` VALUES (10, '2026-04-09', 7, 5, 3, 80, 20, 195, 40000, 3500, 'completada');
INSERT INTO `op_selladora` VALUES (11, '2026-04-10', 7, 5, 4, 80, 20, 195, 23000, 1191, 'completada');
INSERT INTO `op_selladora` VALUES (13, '2026-04-14', 7, 560, 1, 40, 22, 60, 16900, 169, 'completada');
INSERT INTO `op_selladora` VALUES (14, '2026-04-14', 7, 559, 2, 120, 15, 120, 25000, 513, 'completada');
INSERT INTO `op_selladora` VALUES (15, '2026-04-15', 7, 560, 1, 50, 22, 70, 8250, 125, 'completada');
INSERT INTO `op_selladora` VALUES (16, '2026-04-15', 7, 559, 2, 120, 15, 90, 20000, 310, 'completada');
INSERT INTO `op_selladora` VALUES (17, '2026-04-17', 7, 559, 2, 55, 15, 65, 55000, 280, 'completada');
INSERT INTO `op_selladora` VALUES (18, '2026-04-21', 15, 557, 6, 115, 30, 80, 4000, 210, 'completada');
INSERT INTO `op_selladora` VALUES (19, '2026-04-21', 13, 559, 1, 67, 30, 150, 20000, 545, 'completada');
INSERT INTO `op_selladora` VALUES (20, '2026-04-21', 18, 559, 2, 120, 15, 80, 10000, 140, 'completada');
INSERT INTO `op_selladora` VALUES (21, '2026-04-22', 16, 557, 3, 120, 40, 130, 450, 65, 'completada');
INSERT INTO `op_selladora` VALUES (22, '2026-04-22', 19, 6, 1, 20, 80, 22, 10000, 70, 'completada');
INSERT INTO `op_selladora` VALUES (23, '2026-04-22', 17, 559, 2, 53, 30, 86, 16000, 224, 'completada');
INSERT INTO `op_selladora` VALUES (24, '2026-04-22', 7, 6, 1, 40, 80, 60, 8000, 140, 'completada');
INSERT INTO `op_selladora` VALUES (25, '2026-04-22', 17, 559, 2, 120, 30, 75, 8000, 210, 'completada');
INSERT INTO `op_selladora` VALUES (26, '2026-04-23', 7, 559, 2, 120, 15, 90, 15000, 210, 'completada');
INSERT INTO `op_selladora` VALUES (27, '2026-04-23', 19, 6, 1, 15, 80, 20, 10000, 43, 'completada');
INSERT INTO `op_selladora` VALUES (28, '2026-04-23', 7, 559, 2, 120, 15, 67, 10000, 104, 'completada');
INSERT INTO `op_selladora` VALUES (30, '2026-04-24', 7, 5, 3, 80, 20, 195, 54000, 2800, 'completada');
INSERT INTO `op_selladora` VALUES (31, '2026-04-24', 7, 5, 3, 80, 20, 195, 9250, 500, 'completada');
INSERT INTO `op_selladora` VALUES (32, '2026-04-27', 20, 6, 1, 15, 80, 20, 2500, 10, 'completada');
INSERT INTO `op_selladora` VALUES (33, '2026-04-27', 21, 6, 1, 40, 80, 38, 3000, 67, 'completada');
INSERT INTO `op_selladora` VALUES (34, '2026-04-30', 7, 5, 6, 80, 20, 195, 25000, 1150, 'completada');
INSERT INTO `op_selladora` VALUES (35, '2026-04-28', 7, 5, 4, 80, 20, 195, 10000, 420, 'completada');
INSERT INTO `op_selladora` VALUES (36, '2026-04-30', 7, 5, 3, 80, 20, 195, 40000, 2000, 'completada');
INSERT INTO `op_selladora` VALUES (37, '2026-04-29', 22, 6, 1, 20, 80, 42, 4000, 50, 'completada');
INSERT INTO `op_selladora` VALUES (38, '2026-04-30', 7, 559, 2, 120, 15, 90, 10000, 155, 'cancelada');
INSERT INTO `op_selladora` VALUES (39, '2026-05-04', 7, 559, 2, 120, 15, 80, 10000, 135, 'completada');
INSERT INTO `op_selladora` VALUES (40, '2026-05-05', 7, 559, 2, 120, 15, 90, 19000, 150, 'completada');
INSERT INTO `op_selladora` VALUES (41, '2026-05-05', 7, 5, 4, 80, 20, 195, 24000, 1000, 'completada');
INSERT INTO `op_selladora` VALUES (42, '2026-05-06', 6, 560, 3, 58, 25, 85, 13300, 312, 'completada');
INSERT INTO `op_selladora` VALUES (43, '2026-05-06', 7, 559, 2, 120, 15, 67, 20000, 230, 'completada');
INSERT INTO `op_selladora` VALUES (44, '2026-05-06', 7, 5, 6, 80, 20, 195, 46750, 2500, 'completada');
INSERT INTO `op_selladora` VALUES (45, '2026-05-07', 7, 5, 3, 80, 20, 195, 45000, 2000, 'completada');
INSERT INTO `op_selladora` VALUES (46, '2026-05-07', 7, 559, 2, 120, 15, 50, 8000, 70, 'completada');
INSERT INTO `op_selladora` VALUES (47, '2026-05-07', 25, 557, 1, 110, 25, 120, 7300, 450, 'completada');
INSERT INTO `op_selladora` VALUES (48, '2026-05-08', 7, 7, 5, 110, 85, 120, 2500, 530, 'completada');
INSERT INTO `op_selladora` VALUES (49, '2026-05-08', 7, 5, 2, 80, 20, 195, 25000, 1200, 'completada');
INSERT INTO `op_selladora` VALUES (50, '2026-05-11', 8, 6, 1, 62, 70, 90, 6000, 450, 'completada');
INSERT INTO `op_selladora` VALUES (51, '2026-05-12', 23, 6, 1, 13, 70, 23, 76000, 301, 'completada');
INSERT INTO `op_selladora` VALUES (52, '2026-05-12', 26, 559, 2, 85, 30, 85, 13000, 240, 'completada');
INSERT INTO `op_selladora` VALUES (53, '2026-05-13', 7, 5, 4, 80, 20, 195, 27750, 1500, 'completada');
INSERT INTO `op_selladora` VALUES (54, '2026-05-13', 7, 6, 1, 30, 15, 110, 22000, 200, 'completada');
INSERT INTO `op_selladora` VALUES (55, '2026-05-14', 23, 6, 1, 15, 70, 33, 30000, 206, 'completada');
INSERT INTO `op_selladora` VALUES (56, '2026-05-14', 27, 6, 1, 61, 70, 90, 2000, 235, 'completada');
INSERT INTO `op_selladora` VALUES (57, '2026-05-14', 27, 6, 1, 61, 70, 100, 800, 75, 'completada');
INSERT INTO `op_selladora` VALUES (58, '2026-05-14', 7, 559, 2, 120, 15, 80, 10000, 130, 'completada');
INSERT INTO `op_selladora` VALUES (59, '2026-05-14', 7, 559, 2, 120, 15, 90, 10000, 160, 'completada');
INSERT INTO `op_selladora` VALUES (60, '2026-05-15', 7, 5, 2, 80, 20, 195, 27750, 1500, 'completada');
INSERT INTO `op_selladora` VALUES (61, '2026-05-15', 7, 6, 1, 40, 80, 40, 3000, 70, 'completada');
INSERT INTO `op_selladora` VALUES (62, '2026-05-18', 28, 6, 1, 55, 70, 95, 6000, 100, 'completada');
INSERT INTO `op_selladora` VALUES (63, '2026-05-18', 26, 562, 2, 120, 15, 80, 10000, 170, 'completada');
INSERT INTO `op_selladora` VALUES (64, '2026-05-19', 7, 560, 1, 30, 22, 40, 21000, 95, 'completada');
INSERT INTO `op_selladora` VALUES (65, '2026-05-19', 7, 5, 7, 80, 20, 195, 27750, 1500, 'completada');
INSERT INTO `op_selladora` VALUES (66, '2026-05-20', 29, 6, 1, 30, 30, 70, 3000, 34, 'completada');
INSERT INTO `op_selladora` VALUES (67, '2026-05-20', 15, 559, 2, 120, 30, 75, 20000, 480, 'completada');
INSERT INTO `op_selladora` VALUES (68, '2026-05-20', 7, 557, 2, 135, 20, 70, 45000, 1300, 'en_produccion');
INSERT INTO `op_selladora` VALUES (69, '2026-05-26', 31, 6, 1, 30, 30, 50, 6000, 50, 'completada');
INSERT INTO `op_selladora` VALUES (70, '2026-05-26', 32, 557, 2, 55, 20, 85, 15000, 200, 'completada');
INSERT INTO `op_selladora` VALUES (71, '2026-05-26', 30, 562, 2, 110, 15, 57, 23000, 200, 'completada');
INSERT INTO `op_selladora` VALUES (72, '2026-05-27', 7, 559, 2, 120, 15, 90, 20000, 300, 'completada');
INSERT INTO `op_selladora` VALUES (73, '2026-05-27', 7, 559, 2, 120, 15, 80, 10000, 130, 'completada');
INSERT INTO `op_selladora` VALUES (74, '2026-05-27', 7, 5, 6, 80, 20, 195, 50000, 2000, 'en_produccion');
INSERT INTO `op_selladora` VALUES (75, '2026-05-27', 7, 6, 1, 30, 15, 70, 30000, 170, 'completada');
INSERT INTO `op_selladora` VALUES (76, '2026-05-28', 7, 559, 2, 120, 15, 120, 10000, 200, 'en_produccion');

-- ----------------------------
-- Table structure for ordenes_produccion
-- ----------------------------
DROP TABLE IF EXISTS `ordenes_produccion`;
CREATE TABLE `ordenes_produccion`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` enum('pendiente','en_produccion','completada','cancelada') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `empresa_id` int NULL DEFAULT NULL,
  `oc_cliente` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `fecha` date NOT NULL,
  `densidad` enum('alta','baja') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color_id` int NOT NULL,
  `ancho` int NOT NULL,
  `espesor` int NOT NULL,
  `kilos` float NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_ordenes_produccion_id`(`id` ASC) USING BTREE,
  INDEX `fk_op_color`(`color_id` ASC) USING BTREE,
  INDEX `empresa_id`(`empresa_id` ASC) USING BTREE,
  INDEX `producto_id`(`producto_id` ASC) USING BTREE,
  CONSTRAINT `fk_op_color` FOREIGN KEY (`color_id`) REFERENCES `colores` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ordenes_produccion_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ordenes_produccion_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 83 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ordenes_produccion
-- ----------------------------
INSERT INTO `ordenes_produccion` VALUES (10, 'completada', 4, '676', '2026-03-30', 'alta', 1, 130, 20, 810, 4);
INSERT INTO `ordenes_produccion` VALUES (11, 'completada', 7, NULL, '2026-04-02', 'baja', 3, 80, 20, 2000, 2);
INSERT INTO `ordenes_produccion` VALUES (12, 'completada', 6, '4215', '2026-04-01', 'alta', 3, 58, 25, 300, 556);
INSERT INTO `ordenes_produccion` VALUES (13, 'completada', 8, NULL, '2026-04-02', 'baja', 1, 62, 70, 450, 3);
INSERT INTO `ordenes_produccion` VALUES (14, 'completada', 7, NULL, '2026-04-07', 'baja', 1, 40, 80, 64, 2);
INSERT INTO `ordenes_produccion` VALUES (15, 'completada', 9, '2747', '2026-04-07', 'baja', 1, 40, 70, 400, 2);
INSERT INTO `ordenes_produccion` VALUES (16, 'completada', 7, NULL, '2026-04-07', 'baja', 3, 80, 20, 1200, 2);
INSERT INTO `ordenes_produccion` VALUES (17, 'completada', 7, NULL, '2026-04-09', 'baja', 4, 80, 20, 1200, 2);
INSERT INTO `ordenes_produccion` VALUES (18, 'completada', 7, NULL, '2026-04-13', 'alta', 1, 40, 22, 170, 556);
INSERT INTO `ordenes_produccion` VALUES (19, 'completada', 7, NULL, '2026-04-13', 'alta', 1, 50, 22, 100, 556);
INSERT INTO `ordenes_produccion` VALUES (20, 'completada', 7, NULL, '2026-04-14', 'alta', 2, 120, 15, 1500, 4);
INSERT INTO `ordenes_produccion` VALUES (21, 'completada', 7, NULL, '2026-04-15', 'alta', 2, 55, 15, 250, 4);
INSERT INTO `ordenes_produccion` VALUES (22, 'completada', 7, NULL, '2026-04-16', 'baja', 3, 80, 65, 92, 2);
INSERT INTO `ordenes_produccion` VALUES (23, 'completada', 12, '7087', '2026-04-16', 'baja', 1, 50, 90, 600, 1);
INSERT INTO `ordenes_produccion` VALUES (24, 'completada', 13, '170426', '2026-04-20', 'alta', 1, 67, 30, 540, 4);
INSERT INTO `ordenes_produccion` VALUES (25, 'completada', 15, '91', '2026-04-20', 'baja', 6, 115, 30, 210, 3);
INSERT INTO `ordenes_produccion` VALUES (26, 'completada', 16, NULL, '2026-04-21', 'baja', 3, 120, 40, 60, 3);
INSERT INTO `ordenes_produccion` VALUES (27, 'completada', 17, '755', '2026-04-21', 'baja', 2, 120, 30, 200, 4);
INSERT INTO `ordenes_produccion` VALUES (28, 'completada', 17, '756', '2026-04-21', 'baja', 2, 53, 30, 200, 4);
INSERT INTO `ordenes_produccion` VALUES (29, 'completada', 7, NULL, '2026-04-21', 'baja', 2, 120, 30, 194, 4);
INSERT INTO `ordenes_produccion` VALUES (30, 'completada', 7, NULL, '2026-04-21', 'baja', 1, 20, 80, 200, 2);
INSERT INTO `ordenes_produccion` VALUES (31, 'completada', 7, NULL, '2026-04-21', 'baja', 3, 80, 20, 500, 1);
INSERT INTO `ordenes_produccion` VALUES (32, 'completada', 7, NULL, '2026-04-22', 'baja', 1, 15, 80, 230, 2);
INSERT INTO `ordenes_produccion` VALUES (33, 'completada', 7, NULL, '2026-04-22', 'baja', 1, 40, 80, 250, 2);
INSERT INTO `ordenes_produccion` VALUES (34, 'completada', 7, NULL, '2026-04-22', 'baja', 3, 80, 20, 2800, 1);
INSERT INTO `ordenes_produccion` VALUES (35, 'completada', 7, NULL, '2026-04-23', 'baja', 1, 30, 30, 150, 2);
INSERT INTO `ordenes_produccion` VALUES (36, 'completada', 9, '2753', '2026-04-28', 'baja', 1, 15, 70, 500, 1);
INSERT INTO `ordenes_produccion` VALUES (37, 'completada', 7, NULL, '2026-04-30', 'baja', 1, 15, 80, 60, 1);
INSERT INTO `ordenes_produccion` VALUES (38, 'completada', 7, NULL, '2026-04-28', 'baja', 4, 80, 20, 429, 1);
INSERT INTO `ordenes_produccion` VALUES (39, 'completada', 7, NULL, '2026-04-28', 'baja', 6, 80, 20, 1100, 1);
INSERT INTO `ordenes_produccion` VALUES (40, 'completada', 7, NULL, '2026-04-29', 'baja', 3, 80, 20, 2050, 1);
INSERT INTO `ordenes_produccion` VALUES (41, 'completada', 9, '2753', '2026-04-30', 'baja', 1, 20, 70, 500, 1);
INSERT INTO `ordenes_produccion` VALUES (42, 'completada', 9, '2753', '2026-04-30', 'baja', 1, 40, 70, 300, 1);
INSERT INTO `ordenes_produccion` VALUES (43, 'completada', 7, NULL, '2026-05-04', 'baja', 1, 40, 80, 120, 1);
INSERT INTO `ordenes_produccion` VALUES (44, 'completada', 6, '4243', '2026-05-05', 'alta', 3, 58, 25, 300, 2);
INSERT INTO `ordenes_produccion` VALUES (45, 'completada', 7, NULL, '2026-05-05', 'baja', 4, 80, 20, 1100, 1);
INSERT INTO `ordenes_produccion` VALUES (46, 'completada', 7, NULL, '2026-05-05', 'alta', 2, 120, 15, 900, 4);
INSERT INTO `ordenes_produccion` VALUES (47, 'completada', 23, NULL, '2026-05-06', 'baja', 1, 15, 70, 200, 2);
INSERT INTO `ordenes_produccion` VALUES (48, 'completada', 7, NULL, '2026-05-06', 'baja', 6, 80, 20, 2500, 1);
INSERT INTO `ordenes_produccion` VALUES (49, 'completada', 7, NULL, '2026-05-06', 'baja', 1, 110, 25, 450, 3);
INSERT INTO `ordenes_produccion` VALUES (50, 'completada', 7, NULL, '2026-05-06', 'baja', 1, 110, 85, 65, 3);
INSERT INTO `ordenes_produccion` VALUES (51, 'completada', 23, NULL, '2026-05-06', 'baja', 1, 13, 70, 300, 1);
INSERT INTO `ordenes_produccion` VALUES (52, 'completada', 7, NULL, '2026-05-06', 'baja', 5, 110, 85, 530, 3);
INSERT INTO `ordenes_produccion` VALUES (53, 'completada', 7, NULL, '2026-05-06', 'baja', 3, 80, 20, 2550, 1);
INSERT INTO `ordenes_produccion` VALUES (54, 'completada', 7, NULL, '2026-05-07', 'baja', 6, 80, 65, 65, 1);
INSERT INTO `ordenes_produccion` VALUES (55, 'completada', 7, NULL, '2026-05-07', 'baja', 7, 80, 65, 65, 1);
INSERT INTO `ordenes_produccion` VALUES (56, 'completada', 8, NULL, '2026-05-07', 'baja', 1, 62, 70, 450, 3);
INSERT INTO `ordenes_produccion` VALUES (57, 'completada', 7, NULL, '2026-05-07', 'baja', 10, 80, 65, 65, 1);
INSERT INTO `ordenes_produccion` VALUES (58, 'completada', 9, NULL, '2026-05-07', 'baja', 1, 30, 70, 500, 1);
INSERT INTO `ordenes_produccion` VALUES (59, 'completada', 7, NULL, '2026-05-08', 'baja', 2, 80, 20, 1050, 1);
INSERT INTO `ordenes_produccion` VALUES (60, 'completada', 26, NULL, '2026-05-11', 'baja', 2, 85, 30, 240, 4);
INSERT INTO `ordenes_produccion` VALUES (61, 'completada', 28, NULL, '2026-05-12', 'baja', 1, 55, 70, 40, 2);
INSERT INTO `ordenes_produccion` VALUES (62, 'completada', 7, NULL, '2026-05-12', 'baja', 4, 80, 20, 1500, 1);
INSERT INTO `ordenes_produccion` VALUES (63, 'completada', 27, NULL, '2026-05-12', 'baja', 1, 61, 70, 235, 3);
INSERT INTO `ordenes_produccion` VALUES (64, 'completada', 7, NULL, '2026-05-13', 'alta', 1, 30, 15, 700, 1);
INSERT INTO `ordenes_produccion` VALUES (65, 'completada', 7, NULL, '2026-05-13', 'baja', 4, 80, 60, 33, 1);
INSERT INTO `ordenes_produccion` VALUES (66, 'completada', 7, NULL, '2026-05-14', 'baja', 2, 80, 20, 1600, 1);
INSERT INTO `ordenes_produccion` VALUES (67, 'completada', 7, NULL, '2026-05-18', 'alta', 1, 30, 22, 80, 556);
INSERT INTO `ordenes_produccion` VALUES (68, 'completada', 7, NULL, '2026-05-18', 'alta', 2, 135, 20, 1300, 3);
INSERT INTO `ordenes_produccion` VALUES (69, 'completada', 7, NULL, '2026-05-18', 'alta', 1, 20, 22, 100, 1);
INSERT INTO `ordenes_produccion` VALUES (70, 'completada', 7, NULL, '2026-05-19', 'baja', 7, 80, 20, 1245, 1);
INSERT INTO `ordenes_produccion` VALUES (71, 'completada', 7, NULL, '2026-05-20', 'baja', 2, 120, 30, 300, 4);
INSERT INTO `ordenes_produccion` VALUES (72, 'completada', 7, NULL, '2026-05-25', 'alta', 2, 55, 20, 200, 3);
INSERT INTO `ordenes_produccion` VALUES (73, 'completada', 30, NULL, '2026-05-26', 'alta', 2, 110, 15, 200, 555);
INSERT INTO `ordenes_produccion` VALUES (74, 'completada', 7, NULL, '2026-05-26', 'baja', 6, 80, 20, 2000, 1);
INSERT INTO `ordenes_produccion` VALUES (75, 'completada', 7, NULL, '2026-05-26', 'alta', 2, 120, 15, 700, 4);
INSERT INTO `ordenes_produccion` VALUES (76, 'completada', 7, NULL, '2026-05-27', 'baja', 3, 80, 60, 90, 563);
INSERT INTO `ordenes_produccion` VALUES (77, 'completada', 7, NULL, '2026-05-27', 'baja', 3, 80, 20, 80, 1);
INSERT INTO `ordenes_produccion` VALUES (78, 'completada', 9, '2765', '2026-05-27', 'baja', 1, 40, 70, 500, 1);
INSERT INTO `ordenes_produccion` VALUES (79, 'completada', 7, NULL, '2026-05-27', 'baja', 1, 40, 80, 39, 1);
INSERT INTO `ordenes_produccion` VALUES (80, 'en_produccion', 7, NULL, '2026-05-28', 'baja', 4, 80, 20, 2000, 1);
INSERT INTO `ordenes_produccion` VALUES (81, 'completada', 9, '2765', '2026-05-28', 'baja', 1, 30, 70, 300, 1);
INSERT INTO `ordenes_produccion` VALUES (82, 'en_produccion', 7, NULL, '2026-05-28', 'baja', 3, 80, 20, 1000, 1);

-- ----------------------------
-- Table structure for perfiles
-- ----------------------------
DROP TABLE IF EXISTS `perfiles`;
CREATE TABLE `perfiles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_perfiles_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of perfiles
-- ----------------------------
INSERT INTO `perfiles` VALUES (1, 'admin', 'Administrador del sistema');
INSERT INTO `perfiles` VALUES (2, 'jefe', 'Jefe de producci├│n');
INSERT INTO `perfiles` VALUES (3, 'operario', 'Operario de planta');

-- ----------------------------
-- Table structure for produccion_extrusora
-- ----------------------------
DROP TABLE IF EXISTS `produccion_extrusora`;
CREATE TABLE `produccion_extrusora`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `op_id` int NOT NULL,
  `fecha` date NOT NULL,
  `turno` enum('dia','noche') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `maquina_id` int NOT NULL,
  `lote` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `op_id`(`op_id` ASC) USING BTREE,
  INDEX `ix_produccion_extrusora_id`(`id` ASC) USING BTREE,
  INDEX `fk_prod_maquina`(`maquina_id` ASC) USING BTREE,
  INDEX `fk_prod_usuario`(`usuario_id` ASC) USING BTREE,
  CONSTRAINT `fk_prod_maquina` FOREIGN KEY (`maquina_id`) REFERENCES `maquinas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_prod_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `produccion_extrusora_ibfk_1` FOREIGN KEY (`op_id`) REFERENCES `ordenes_produccion` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 200 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of produccion_extrusora
-- ----------------------------
INSERT INTO `produccion_extrusora` VALUES (17, 10, '2026-03-30', 'dia', 1, '22726', 5);
INSERT INTO `produccion_extrusora` VALUES (22, 10, '2026-03-31', 'noche', 1, '22726', 6);
INSERT INTO `produccion_extrusora` VALUES (23, 12, '2026-04-01', 'noche', 1, '22726', 6);
INSERT INTO `produccion_extrusora` VALUES (24, 13, '2026-04-02', 'dia', 1, '31326', 5);
INSERT INTO `produccion_extrusora` VALUES (25, 11, '2026-04-02', 'dia', 2, '31326', 5);
INSERT INTO `produccion_extrusora` VALUES (26, 11, '2026-04-06', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (27, 11, '2026-04-07', 'noche', 2, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (28, 11, '2026-04-07', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (29, 14, '2026-04-07', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (30, 15, '2026-04-07', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (31, 15, '2026-04-07', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (32, 16, '2026-04-07', 'noche', 2, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (33, 16, '2026-04-08', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (34, 16, '2026-04-08', 'noche', 2, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (35, 16, '2026-04-09', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (36, 17, '2026-04-09', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (37, 17, '2026-04-10', 'noche', 2, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (38, 17, '2026-04-10', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (39, 18, '2026-04-13', 'dia', 1, '22726', 5);
INSERT INTO `produccion_extrusora` VALUES (40, 19, '2026-04-13', 'dia', 1, '22726', 5);
INSERT INTO `produccion_extrusora` VALUES (41, 19, '2026-04-14', 'dia', 1, '22726', 5);
INSERT INTO `produccion_extrusora` VALUES (42, 20, '2026-04-14', 'dia', 1, '31326', 5);
INSERT INTO `produccion_extrusora` VALUES (43, 20, '2026-04-14', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (44, 20, '2026-04-15', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (45, 20, '2026-04-15', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (46, 21, '2026-04-15', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (48, 21, '2026-04-16', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (49, 22, '2026-04-16', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (50, 23, '2026-04-16', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (52, 23, '2026-04-16', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (53, 23, '2026-04-20', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (54, 24, '2026-04-20', 'noche', 1, '31426', 6);
INSERT INTO `produccion_extrusora` VALUES (56, 25, '2026-04-20', 'noche', 2, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (57, 25, '2026-04-21', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (58, 24, '2026-04-21', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (59, 26, '2026-04-21', 'dia', 2, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (60, 27, '2026-04-21', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (61, 28, '2026-04-21', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (62, 28, '2026-04-21', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (63, 29, '2026-04-21', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (64, 30, '2026-04-21', 'noche', 3, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (65, 31, '2026-04-21', 'noche', 1, '31926', 6);
INSERT INTO `produccion_extrusora` VALUES (66, 30, '2026-04-22', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (67, 31, '2026-04-22', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (68, 32, '2026-04-22', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (69, 33, '2026-04-22', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (70, 33, '2026-04-22', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (71, 32, '2026-04-22', 'noche', 3, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (72, 34, '2026-04-22', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (73, 35, '2026-04-23', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (74, 34, '2026-04-23', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (75, 34, '2026-04-23', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (76, 34, '2026-04-24', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (77, 34, '2026-04-27', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (78, 34, '2026-04-28', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (79, 36, '2026-04-28', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (80, 37, '2026-04-28', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (81, 36, '2026-04-28', 'noche', 3, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (82, 36, '2026-04-29', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (83, 40, '2026-04-29', 'noche', 2, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (84, 40, '2026-04-29', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (85, 39, '2026-04-28', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (86, 39, '2026-04-28', 'noche', 2, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (87, 38, '2026-04-28', 'noche', 1, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (88, 38, '2026-04-28', 'noche', 2, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (89, 39, '2026-04-29', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (90, 39, '2026-04-29', 'dia', 2, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (91, 36, '2026-04-29', 'noche', 3, '32626', 6);
INSERT INTO `produccion_extrusora` VALUES (92, 37, '2026-04-30', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (93, 40, '2026-04-30', 'dia', 2, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (94, 40, '2026-04-30', 'dia', 1, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (95, 36, '2026-04-30', 'dia', 3, '32626', 5);
INSERT INTO `produccion_extrusora` VALUES (96, 41, '2026-04-30', 'dia', 3, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (97, 42, '2026-04-30', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (98, 41, '2026-05-04', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (99, 43, '2026-05-04', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (100, 42, '2026-05-04', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (101, 44, '2026-05-05', 'dia', 1, '31926', 5);
INSERT INTO `produccion_extrusora` VALUES (102, 45, '2026-05-05', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (103, 41, '2026-05-05', 'dia', 3, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (104, 45, '2026-05-05', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (105, 41, '2026-05-05', 'noche', 3, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (106, 46, '2026-05-05', 'noche', 1, '31426', 6);
INSERT INTO `produccion_extrusora` VALUES (107, 45, '2026-05-06', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (108, 47, '2026-05-06', 'dia', 3, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (109, 46, '2026-05-06', 'dia', 1, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (110, 48, '2026-05-06', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (112, 49, '2026-05-06', 'dia', 2, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (114, 49, '2026-05-06', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (115, 47, '2026-05-06', 'noche', 3, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (116, 46, '2026-05-06', 'noche', 1, '31426', 6);
INSERT INTO `produccion_extrusora` VALUES (117, 50, '2026-05-06', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (118, 51, '2026-05-06', 'noche', 3, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (119, 52, '2026-05-06', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (120, 53, '2026-05-06', 'noche', 1, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (121, 53, '2026-05-07', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (122, 51, '2026-05-07', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (123, 54, '2026-05-07', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (124, 55, '2026-05-07', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (125, 56, '2026-05-07', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (126, 57, '2026-05-07', 'dia', 2, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (127, 56, '2026-05-07', 'noche', 1, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (128, 51, '2026-05-07', 'noche', 3, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (129, 53, '2026-05-07', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (130, 58, '2026-05-07', 'noche', 3, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (131, 58, '2026-05-07', 'noche', 1, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (132, 58, '2026-05-08', 'dia', 1, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (133, 58, '2026-05-08', 'dia', 3, '40726', 5);
INSERT INTO `produccion_extrusora` VALUES (134, 53, '2026-05-08', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (135, 59, '2026-05-08', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (136, 59, '2026-05-08', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (137, 60, '2026-05-11', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (138, 48, '2026-05-11', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (140, 48, '2026-05-11', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (141, 48, '2026-05-11', 'noche', 1, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (142, 48, '2026-05-11', 'noche', 2, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (143, 48, '2026-05-12', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (144, 48, '2026-05-12', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (145, 61, '2026-05-12', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (146, 53, '2026-05-12', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (147, 53, '2026-05-12', 'noche', 1, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (148, 48, '2026-05-12', 'noche', 2, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (149, 62, '2026-05-12', 'noche', 2, '40726', 6);
INSERT INTO `produccion_extrusora` VALUES (150, 63, '2026-05-12', 'noche', 1, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (151, 63, '2026-05-13', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (152, 62, '2026-05-13', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (153, 64, '2026-05-13', 'dia', 3, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (154, 64, '2026-05-13', 'noche', 3, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (155, 62, '2026-05-13', 'noche', 2, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (156, 65, '2026-05-13', 'noche', 2, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (158, 64, '2026-05-14', 'dia', 3, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (160, 62, '2026-05-14', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (161, 66, '2026-05-14', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (162, 66, '2026-05-14', 'noche', 2, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (163, 64, '2026-05-14', 'noche', 3, '41626', 6);
INSERT INTO `produccion_extrusora` VALUES (164, 66, '2026-05-15', 'dia', 2, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (165, 64, '2026-05-15', 'dia', 3, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (166, 67, '2026-05-18', 'dia', 3, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (167, 68, '2026-05-18', 'dia', 2, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (168, 53, '2026-05-18', 'dia', 1, '42326', 5);
INSERT INTO `produccion_extrusora` VALUES (169, 53, '2026-05-18', 'noche', 1, '42326', 6);
INSERT INTO `produccion_extrusora` VALUES (170, 69, '2026-05-18', 'noche', 3, '41626', 6);
INSERT INTO `produccion_extrusora` VALUES (171, 53, '2026-05-19', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (172, 70, '2026-05-19', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (173, 70, '2026-05-19', 'noche', 1, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (174, 70, '2026-05-20', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (175, 71, '2026-05-20', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (176, 68, '2026-05-25', 'dia', 2, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (177, 71, '2026-05-25', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (178, 68, '2026-05-25', 'noche', 2, '41626', 6);
INSERT INTO `produccion_extrusora` VALUES (179, 72, '2026-05-25', 'noche', 1, '41626', 6);
INSERT INTO `produccion_extrusora` VALUES (180, 73, '2026-05-26', 'dia', 1, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (181, 68, '2026-05-26', 'dia', 2, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (182, 74, '2026-05-26', 'dia', 2, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (183, 75, '2026-05-26', 'dia', 1, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (184, 74, '2026-05-26', 'noche', 2, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (185, 75, '2026-05-26', 'noche', 1, '41626', 6);
INSERT INTO `produccion_extrusora` VALUES (186, 74, '2026-05-27', 'dia', 2, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (187, 75, '2026-05-27', 'dia', 1, '41626', 5);
INSERT INTO `produccion_extrusora` VALUES (188, 76, '2026-05-27', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (189, 77, '2026-05-27', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (190, 78, '2026-05-27', 'noche', 1, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (191, 74, '2026-05-27', 'noche', 2, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (192, 79, '2026-05-27', 'noche', 1, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (193, 78, '2026-05-28', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (194, 80, '2026-05-28', 'dia', 2, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (195, 81, '2026-05-28', 'dia', 1, '50526', 5);
INSERT INTO `produccion_extrusora` VALUES (196, 81, '2026-05-28', 'noche', 1, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (197, 80, '2026-05-28', 'noche', 2, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (198, 80, '2026-05-28', 'noche', 2, '50526', 6);
INSERT INTO `produccion_extrusora` VALUES (199, 82, '2026-05-28', 'noche', 1, '50526', 6);

-- ----------------------------
-- Table structure for produccion_selladora
-- ----------------------------
DROP TABLE IF EXISTS `produccion_selladora`;
CREATE TABLE `produccion_selladora`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `op_id` int NOT NULL,
  `maquina_id` int NOT NULL,
  `turno` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha` date NOT NULL,
  `usuario_id` int NULL DEFAULT NULL,
  `scrap` float NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `maquina_id`(`maquina_id` ASC) USING BTREE,
  INDEX `op_id`(`op_id` ASC) USING BTREE,
  INDEX `ix_produccion_selladora_id`(`id` ASC) USING BTREE,
  INDEX `fk_prod_sell_usuario`(`usuario_id` ASC) USING BTREE,
  CONSTRAINT `fk_prod_sell_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `produccion_selladora_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquinas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `produccion_selladora_ibfk_2` FOREIGN KEY (`op_id`) REFERENCES `op_selladora` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 211 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of produccion_selladora
-- ----------------------------
INSERT INTO `produccion_selladora` VALUES (3, 3, 7, 'dia', '2026-04-01', 7, 0);
INSERT INTO `produccion_selladora` VALUES (5, 4, 5, 'noche', '2026-04-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (6, 6, 6, 'dia', '2026-04-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (7, 6, 8, 'dia', '2026-04-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (13, 8, 4, 'dia', '2026-04-07', 7, 0);
INSERT INTO `produccion_selladora` VALUES (25, 6, 6, 'noche', '2026-04-07', 7, 0);
INSERT INTO `produccion_selladora` VALUES (26, 6, 8, 'dia', '2026-04-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (27, 6, 6, 'dia', '2026-04-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (28, 6, 6, 'noche', '2026-04-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (29, 4, 5, 'noche', '2026-04-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (30, 10, 6, 'dia', '2026-04-09', 10, 0);
INSERT INTO `produccion_selladora` VALUES (31, 10, 8, 'dia', '2026-04-09', 10, 0);
INSERT INTO `produccion_selladora` VALUES (32, 10, 6, 'noche', '2026-04-09', 7, 0);
INSERT INTO `produccion_selladora` VALUES (33, 10, 8, 'noche', '2026-04-09', 7, 0);
INSERT INTO `produccion_selladora` VALUES (34, 10, 8, 'dia', '2026-04-10', 10, 0);
INSERT INTO `produccion_selladora` VALUES (35, 10, 6, 'dia', '2026-04-10', 10, 0);
INSERT INTO `produccion_selladora` VALUES (36, 11, 8, 'dia', '2026-04-10', 10, 0);
INSERT INTO `produccion_selladora` VALUES (37, 11, 6, 'dia', '2026-04-10', 10, 0);
INSERT INTO `produccion_selladora` VALUES (38, 11, 6, 'noche', '2026-04-10', 7, 0);
INSERT INTO `produccion_selladora` VALUES (39, 11, 8, 'noche', '2026-04-10', 7, 0);
INSERT INTO `produccion_selladora` VALUES (40, 11, 8, 'dia', '2026-04-13', 7, 0);
INSERT INTO `produccion_selladora` VALUES (42, 13, 9, 'dia', '2026-04-14', 9, 0);
INSERT INTO `produccion_selladora` VALUES (44, 14, 7, 'dia', '2026-04-14', 7, 0);
INSERT INTO `produccion_selladora` VALUES (46, 15, 9, 'dia', '2026-04-15', 9, 0);
INSERT INTO `produccion_selladora` VALUES (47, 14, 7, 'dia', '2026-04-15', 7, 0);
INSERT INTO `produccion_selladora` VALUES (51, 16, 7, 'dia', '2026-04-15', 7, 0);
INSERT INTO `produccion_selladora` VALUES (52, 16, 4, 'dia', '2026-04-17', 10, 0);
INSERT INTO `produccion_selladora` VALUES (53, 17, 4, 'noche', '2026-04-17', 10, 0);
INSERT INTO `produccion_selladora` VALUES (54, 17, 4, 'dia', '2026-04-20', 10, 0);
INSERT INTO `produccion_selladora` VALUES (55, 18, 4, 'dia', '2026-04-21', 10, 0);
INSERT INTO `produccion_selladora` VALUES (56, 20, 7, 'noche', '2026-04-21', 7, 0);
INSERT INTO `produccion_selladora` VALUES (57, 19, 7, 'noche', '2026-04-22', 7, 0);
INSERT INTO `produccion_selladora` VALUES (58, 19, 7, 'dia', '2026-04-22', 9, 0);
INSERT INTO `produccion_selladora` VALUES (59, 21, 4, 'dia', '2026-04-22', 10, 0);
INSERT INTO `produccion_selladora` VALUES (60, 22, 4, 'dia', '2026-04-22', 10, 0);
INSERT INTO `produccion_selladora` VALUES (61, 23, 7, 'dia', '2026-04-22', 9, 0);
INSERT INTO `produccion_selladora` VALUES (62, 24, 4, 'dia', '2026-04-22', 10, 0);
INSERT INTO `produccion_selladora` VALUES (63, 23, 7, 'noche', '2026-04-22', 7, 0);
INSERT INTO `produccion_selladora` VALUES (64, 25, 7, 'noche', '2026-04-23', 7, 0);
INSERT INTO `produccion_selladora` VALUES (65, 26, 7, 'dia', '2026-04-23', 9, 0);
INSERT INTO `produccion_selladora` VALUES (66, 27, 4, 'dia', '2026-04-23', 10, 0);
INSERT INTO `produccion_selladora` VALUES (67, 24, 4, 'dia', '2026-04-23', 10, 0);
INSERT INTO `produccion_selladora` VALUES (68, 28, 7, 'dia', '2026-04-23', 9, 0);
INSERT INTO `produccion_selladora` VALUES (69, 30, 6, 'noche', '2026-04-24', 7, 0);
INSERT INTO `produccion_selladora` VALUES (70, 30, 8, 'noche', '2026-04-24', 7, 0);
INSERT INTO `produccion_selladora` VALUES (72, 30, 6, 'dia', '2026-04-24', 10, 0);
INSERT INTO `produccion_selladora` VALUES (73, 30, 8, 'dia', '2026-04-24', 10, 0);
INSERT INTO `produccion_selladora` VALUES (75, 30, 8, 'noche', '2026-04-25', 7, 0);
INSERT INTO `produccion_selladora` VALUES (77, 30, 6, 'noche', '2026-04-25', 7, 0);
INSERT INTO `produccion_selladora` VALUES (78, 31, 6, 'noche', '2026-04-25', 7, 0);
INSERT INTO `produccion_selladora` VALUES (79, 31, 8, 'dia', '2026-04-27', 7, 0);
INSERT INTO `produccion_selladora` VALUES (80, 32, 4, 'dia', '2026-04-27', 7, 0);
INSERT INTO `produccion_selladora` VALUES (81, 30, 6, 'noche', '2026-04-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (82, 33, 5, 'noche', '2026-04-27', 10, 0);
INSERT INTO `produccion_selladora` VALUES (83, 34, 8, 'noche', '2026-04-30', 10, 0);
INSERT INTO `produccion_selladora` VALUES (84, 34, 6, 'noche', '2026-04-30', 10, 0);
INSERT INTO `produccion_selladora` VALUES (87, 34, 6, 'dia', '2026-04-29', 7, 0);
INSERT INTO `produccion_selladora` VALUES (88, 34, 6, 'noche', '2026-04-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (90, 35, 6, 'noche', '2026-04-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (92, 30, 6, 'dia', '2026-04-28', 7, 0);
INSERT INTO `produccion_selladora` VALUES (93, 36, 8, 'noche', '2026-04-30', 10, 0);
INSERT INTO `produccion_selladora` VALUES (94, 34, 8, 'dia', '2026-04-29', 7, 0);
INSERT INTO `produccion_selladora` VALUES (95, 34, 8, 'noche', '2026-04-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (96, 35, 8, 'noche', '2026-04-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (97, 30, 8, 'dia', '2026-04-28', 7, 0);
INSERT INTO `produccion_selladora` VALUES (98, 36, 6, 'noche', '2026-04-30', 10, 0);
INSERT INTO `produccion_selladora` VALUES (99, 30, 6, 'dia', '2026-04-30', 7, 0);
INSERT INTO `produccion_selladora` VALUES (102, 37, 4, 'dia', '2026-04-29', 7, 0);
INSERT INTO `produccion_selladora` VALUES (104, 36, 8, 'dia', '2026-04-30', 7, 0);
INSERT INTO `produccion_selladora` VALUES (105, 36, 6, 'dia', '2026-04-30', 7, 0);
INSERT INTO `produccion_selladora` VALUES (106, 36, 8, 'dia', '2026-05-04', 10, 0);
INSERT INTO `produccion_selladora` VALUES (107, 36, 6, 'dia', '2026-05-04', 10, 0);
INSERT INTO `produccion_selladora` VALUES (108, 39, 7, 'dia', '2026-05-04', 10, 0);
INSERT INTO `produccion_selladora` VALUES (109, 36, 6, 'dia', '2026-05-05', 10, 0);
INSERT INTO `produccion_selladora` VALUES (111, 40, 7, 'dia', '2026-05-05', 9, 0);
INSERT INTO `produccion_selladora` VALUES (112, 41, 8, 'dia', '2026-05-05', 10, 0);
INSERT INTO `produccion_selladora` VALUES (113, 41, 6, 'dia', '2026-05-05', 10, 0);
INSERT INTO `produccion_selladora` VALUES (115, 36, 6, 'noche', '2026-05-05', 7, 0);
INSERT INTO `produccion_selladora` VALUES (116, 41, 6, 'noche', '2026-05-05', 7, 0);
INSERT INTO `produccion_selladora` VALUES (117, 41, 8, 'noche', '2026-05-05', 7, 0);
INSERT INTO `produccion_selladora` VALUES (118, 41, 6, 'dia', '2026-05-06', 10, 0);
INSERT INTO `produccion_selladora` VALUES (119, 42, 4, 'dia', '2026-05-06', 9, 0);
INSERT INTO `produccion_selladora` VALUES (120, 43, 7, 'noche', '2026-05-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (121, 44, 6, 'noche', '2026-05-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (122, 40, 7, 'noche', '2026-05-06', 7, 0);
INSERT INTO `produccion_selladora` VALUES (123, 45, 6, 'dia', '2026-05-07', 10, 0);
INSERT INTO `produccion_selladora` VALUES (124, 46, 7, 'dia', '2026-05-07', 10, 0);
INSERT INTO `produccion_selladora` VALUES (125, 47, 4, 'dia', '2026-05-07', 10, 0);
INSERT INTO `produccion_selladora` VALUES (126, 45, 6, 'noche', '2026-05-07', 7, 0);
INSERT INTO `produccion_selladora` VALUES (127, 47, 4, 'noche', '2026-05-07', 7, 0);
INSERT INTO `produccion_selladora` VALUES (128, 45, 8, 'dia', '2026-05-08', 10, 0);
INSERT INTO `produccion_selladora` VALUES (129, 45, 6, 'dia', '2026-05-08', 10, 0);
INSERT INTO `produccion_selladora` VALUES (130, 48, 4, 'dia', '2026-05-08', 10, 0);
INSERT INTO `produccion_selladora` VALUES (132, 49, 8, 'dia', '2026-05-08', 10, 0);
INSERT INTO `produccion_selladora` VALUES (133, 49, 6, 'dia', '2026-05-08', 10, 0);
INSERT INTO `produccion_selladora` VALUES (134, 49, 8, 'noche', '2026-05-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (135, 49, 6, 'noche', '2026-05-08', 7, 0);
INSERT INTO `produccion_selladora` VALUES (136, 50, 5, 'dia', '2026-05-11', 7, 0);
INSERT INTO `produccion_selladora` VALUES (137, 49, 8, 'dia', '2026-05-11', 7, 0);
INSERT INTO `produccion_selladora` VALUES (138, 44, 6, 'noche', '2026-05-11', 10, 0);
INSERT INTO `produccion_selladora` VALUES (139, 44, 8, 'noche', '2026-05-11', 10, 0);
INSERT INTO `produccion_selladora` VALUES (140, 51, 4, 'dia', '2026-05-12', 9, 0);
INSERT INTO `produccion_selladora` VALUES (141, 50, 5, 'dia', '2026-05-12', 7, 0);
INSERT INTO `produccion_selladora` VALUES (143, 44, 8, 'dia', '2026-05-12', 7, 0);
INSERT INTO `produccion_selladora` VALUES (144, 44, 6, 'noche', '2026-05-12', 10, 0);
INSERT INTO `produccion_selladora` VALUES (145, 44, 8, 'noche', '2026-05-12', 10, 0);
INSERT INTO `produccion_selladora` VALUES (146, 52, 7, 'dia', '2026-05-13', 7, 50);
INSERT INTO `produccion_selladora` VALUES (147, 44, 8, 'dia', '2026-05-13', 7, 0);
INSERT INTO `produccion_selladora` VALUES (148, 53, 6, 'dia', '2026-05-13', 7, 0);
INSERT INTO `produccion_selladora` VALUES (149, 53, 6, 'noche', '2026-05-13', 10, 30);
INSERT INTO `produccion_selladora` VALUES (150, 54, 4, 'noche', '2026-05-13', 10, 0);
INSERT INTO `produccion_selladora` VALUES (152, 55, 4, 'dia', '2026-05-14', 9, 0);
INSERT INTO `produccion_selladora` VALUES (153, 50, 5, 'dia', '2026-05-14', 7, 0);
INSERT INTO `produccion_selladora` VALUES (154, 56, 5, 'dia', '2026-05-14', 7, 0);
INSERT INTO `produccion_selladora` VALUES (156, 53, 6, 'dia', '2026-05-14', 7, 49);
INSERT INTO `produccion_selladora` VALUES (158, 53, 6, 'noche', '2026-05-14', 10, 32);
INSERT INTO `produccion_selladora` VALUES (159, 53, 8, 'noche', '2026-05-14', 10, 25);
INSERT INTO `produccion_selladora` VALUES (160, 58, 4, 'noche', '2026-05-14', 10, 0);
INSERT INTO `produccion_selladora` VALUES (161, 59, 4, 'noche', '2026-05-14', 10, 0);
INSERT INTO `produccion_selladora` VALUES (162, 53, 8, 'dia', '2026-05-15', 7, 8);
INSERT INTO `produccion_selladora` VALUES (163, 53, 6, 'dia', '2026-05-15', 7, 7);
INSERT INTO `produccion_selladora` VALUES (164, 60, 6, 'dia', '2026-05-15', 7, 40.5);
INSERT INTO `produccion_selladora` VALUES (165, 60, 8, 'dia', '2026-05-15', 7, 40.5);
INSERT INTO `produccion_selladora` VALUES (166, 57, 5, 'dia', '2026-05-15', 7, 0.3);
INSERT INTO `produccion_selladora` VALUES (167, 60, 8, 'noche', '2026-05-15', 10, 35);
INSERT INTO `produccion_selladora` VALUES (168, 60, 6, 'noche', '2026-05-15', 10, 30);
INSERT INTO `produccion_selladora` VALUES (169, 61, 4, 'noche', '2026-05-15', 10, 1);
INSERT INTO `produccion_selladora` VALUES (170, 54, 4, 'noche', '2026-05-15', 10, 0);
INSERT INTO `produccion_selladora` VALUES (171, 60, 8, 'dia', '2026-05-18', 10, 0);
INSERT INTO `produccion_selladora` VALUES (172, 60, 6, 'dia', '2026-05-18', 10, 0);
INSERT INTO `produccion_selladora` VALUES (173, 62, 4, 'dia', '2026-05-18', 10, 0);
INSERT INTO `produccion_selladora` VALUES (174, 63, 4, 'dia', '2026-05-18', 10, 0);
INSERT INTO `produccion_selladora` VALUES (175, 45, 6, 'dia', '2026-05-18', 10, 0);
INSERT INTO `produccion_selladora` VALUES (176, 45, 6, 'noche', '2026-05-18', 7, 38.5);
INSERT INTO `produccion_selladora` VALUES (177, 45, 8, 'noche', '2026-05-18', 7, 42.5);
INSERT INTO `produccion_selladora` VALUES (178, 63, 4, 'dia', '2026-05-19', 10, 0);
INSERT INTO `produccion_selladora` VALUES (179, 45, 8, 'dia', '2026-05-19', 10, 39);
INSERT INTO `produccion_selladora` VALUES (180, 64, 4, 'dia', '2026-05-19', 10, 0);
INSERT INTO `produccion_selladora` VALUES (181, 45, 8, 'noche', '2026-05-19', 7, 26.5);
INSERT INTO `produccion_selladora` VALUES (182, 64, 4, 'noche', '2026-05-19', 7, 0);
INSERT INTO `produccion_selladora` VALUES (183, 65, 8, 'noche', '2026-05-19', 7, 25);
INSERT INTO `produccion_selladora` VALUES (184, 59, 7, 'noche', '2026-05-19', 7, 0);
INSERT INTO `produccion_selladora` VALUES (185, 65, 8, 'dia', '2026-05-20', 10, 41);
INSERT INTO `produccion_selladora` VALUES (186, 59, 7, 'dia', '2026-05-20', 9, 0);
INSERT INTO `produccion_selladora` VALUES (187, 66, 4, 'dia', '2026-05-20', 9, 0);
INSERT INTO `produccion_selladora` VALUES (188, 65, 6, 'dia', '2026-05-20', 10, 39);
INSERT INTO `produccion_selladora` VALUES (189, 67, 4, 'dia', '2026-05-20', 9, 0);
INSERT INTO `produccion_selladora` VALUES (193, 68, 4, 'dia', '2026-05-25', 9, 0);
INSERT INTO `produccion_selladora` VALUES (194, 65, 8, 'dia', '2026-05-25', 10, 15);
INSERT INTO `produccion_selladora` VALUES (195, 67, 7, 'dia', '2026-05-26', 9, 0);
INSERT INTO `produccion_selladora` VALUES (196, 69, 4, 'dia', '2026-05-26', 10, 0);
INSERT INTO `produccion_selladora` VALUES (197, 70, 4, 'dia', '2026-05-26', 10, 0);
INSERT INTO `produccion_selladora` VALUES (198, 71, 4, 'dia', '2026-05-26', 10, 0);
INSERT INTO `produccion_selladora` VALUES (199, 72, 7, 'dia', '2026-05-27', 9, 0);
INSERT INTO `produccion_selladora` VALUES (200, 71, 4, 'dia', '2026-05-27', 10, 3);
INSERT INTO `produccion_selladora` VALUES (201, 73, 7, 'dia', '2026-05-27', 9, 0);
INSERT INTO `produccion_selladora` VALUES (202, 65, 8, 'dia', '2026-05-27', 10, 10);
INSERT INTO `produccion_selladora` VALUES (203, 74, 8, 'dia', '2026-05-27', 10, 25);
INSERT INTO `produccion_selladora` VALUES (204, 75, 4, 'dia', '2026-05-27', 10, 0);
INSERT INTO `produccion_selladora` VALUES (205, 74, 6, 'dia', '2026-05-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (206, 74, 8, 'dia', '2026-05-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (207, 65, 6, 'dia', '2026-05-28', 10, 0);
INSERT INTO `produccion_selladora` VALUES (208, 75, 4, 'dia', '2026-05-28', 9, 0);
INSERT INTO `produccion_selladora` VALUES (209, 76, 4, 'dia', '2026-05-28', 9, 0);

-- ----------------------------
-- Table structure for produccion_selladora_detalle
-- ----------------------------
DROP TABLE IF EXISTS `produccion_selladora_detalle`;
CREATE TABLE `produccion_selladora_detalle`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `produccion_selladora_id` int NOT NULL,
  `detalle_extrusora_id` int NOT NULL,
  `q_paquetes` int NOT NULL,
  `q_unidades_por_paquete` int NOT NULL,
  `unidades` int NOT NULL,
  `kilos` float NOT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `imprimir_kg` tinyint(1) NOT NULL DEFAULT 0,
  `mostrar_titulo` tinyint NOT NULL DEFAULT 1,
  `es_pack_parcial` tinyint NOT NULL DEFAULT 0,
  `kilos_imp` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `produccion_selladora_id`(`produccion_selladora_id` ASC) USING BTREE,
  INDEX `ix_produccion_selladora_detalle_id`(`id` ASC) USING BTREE,
  INDEX `detalle_extrusora_id`(`detalle_extrusora_id` ASC) USING BTREE,
  CONSTRAINT `produccion_selladora_detalle_ibfk_1` FOREIGN KEY (`detalle_extrusora_id`) REFERENCES `detalle_produccion_extrusora` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `produccion_selladora_detalle_ibfk_2` FOREIGN KEY (`produccion_selladora_id`) REFERENCES `produccion_selladora` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 600 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of produccion_selladora_detalle
-- ----------------------------
INSERT INTO `produccion_selladora_detalle` VALUES (8, 3, 51, 10, 500, 5000, 119, '2026-04-02 12:22:30', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (10, 3, 61, 10, 500, 5000, 110, '2026-04-02 14:24:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (11, 3, 60, 8, 500, 4000, 90, '2026-04-02 16:35:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (13, 3, 49, 7, 500, 3500, 104, '2026-04-06 14:27:25', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (15, 3, 50, 8, 500, 4000, 89, '2026-04-06 19:06:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (16, 3, 45, 8, 500, 4000, 97, '2026-04-06 19:07:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (20, 7, 78, 9, 200, 1800, 96, '2026-04-07 19:22:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (27, 3, 44, 7, 500, 3500, 91, '2026-04-07 19:47:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (28, 3, 46, 8, 500, 4000, 83, '2026-04-07 19:49:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (29, 7, 74, 9, 200, 1800, 96, '2026-04-07 19:53:44', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (30, 7, 80, 11, 200, 2200, 118, '2026-04-07 19:56:01', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (31, 6, 76, 5, 200, 1000, 104, '2026-04-07 20:15:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (32, 6, 83, 6, 200, 1200, 125, '2026-04-07 20:15:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (33, 6, 79, 8, 200, 1600, 97, '2026-04-07 20:17:04', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (34, 6, 86, 10, 200, 2000, 165, '2026-04-07 20:17:32', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (35, 6, 71, 7, 200, 1400, 104, '2026-04-07 20:52:34', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (36, 13, 64, 10, 425, 4250, 10, '2026-04-07 20:59:39', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (37, 13, 63, 9, 425, 3825, 10, '2026-04-07 21:02:32', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (38, 13, 65, 9, 425, 3825, 10, '2026-04-07 21:04:03', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (39, 13, 66, 4, 425, 1700, 10, '2026-04-07 21:05:32', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (46, 25, 81, 10, 200, 2000, 105, '2026-04-08 02:53:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (47, 25, 96, 11, 200, 2200, 119.2, '2026-04-08 03:43:09', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (48, 25, 87, 12, 200, 2400, 118, '2026-04-08 06:32:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (49, 26, 84, 13, 200, 2600, 125, '2026-04-08 14:48:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (50, 27, 90, 15, 200, 3000, 100, '2026-04-08 14:52:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (51, 5, 68, 4, 250, 1000, 63, '2026-04-08 15:35:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (52, 5, 70, 4, 250, 1000, 64, '2026-04-08 15:36:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (53, 5, 72, 3, 250, 750, 57, '2026-04-08 15:37:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (54, 5, 73, 2, 250, 500, 52, '2026-04-08 15:39:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (55, 26, 92, 11, 200, 2200, 113, '2026-04-08 20:05:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (56, 27, 85, 12, 200, 2400, 132, '2026-04-08 21:02:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (57, 28, 91, 11, 200, 2200, 107, '2026-04-08 23:29:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (58, 28, 88, 11, 200, 2200, 104, '2026-04-09 00:41:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (59, 28, 89, 12, 200, 2400, 100, '2026-04-09 01:05:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (60, 28, 82, 6, 200, 1200, 68, '2026-04-09 02:16:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (61, 29, 77, 3, 250, 750, 48, '2026-04-09 05:41:40', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (62, 29, 67, 3, 250, 750, 56, '2026-04-09 05:42:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (63, 29, 69, 3, 250, 750, 62, '2026-04-09 05:43:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (65, 30, 111, 11, 200, 2200, 103, '2026-04-09 13:28:55', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (66, 29, 75, 3, 250, 750, 49, '2026-04-09 13:32:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (68, 31, 116, 11, 200, 2200, 113, '2026-04-09 15:28:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (69, 30, 119, 15, 200, 3000, 158, '2026-04-09 17:43:52', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (70, 31, 120, 10, 200, 2000, 114, '2026-04-09 18:12:40', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (71, 30, 121, 11, 200, 2200, 118, '2026-04-09 20:17:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (72, 31, 122, 9, 200, 1800, 107, '2026-04-09 20:30:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (74, 32, 123, 8, 200, 1600, 93, '2026-04-10 02:29:25', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (75, 33, 118, 12, 200, 2400, 116, '2026-04-10 02:34:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (76, 32, 114, 13, 200, 2600, 115, '2026-04-10 03:30:12', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (77, 32, 107, 14, 200, 2800, 170, '2026-04-10 03:55:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (78, 33, 110, 10, 200, 2000, 110, '2026-04-10 04:23:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (79, 32, 113, 10, 200, 2000, 108, '2026-04-10 05:17:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (80, 33, 112, 9, 200, 1800, 102, '2026-04-10 07:09:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (81, 32, 109, 11, 200, 2200, 116, '2026-04-10 07:44:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (82, 33, 115, 6, 200, 1200, 67, '2026-04-10 08:10:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (83, 34, 103, 13, 200, 2600, 137, '2026-04-10 14:25:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (84, 35, 117, 13, 200, 2600, 131, '2026-04-10 14:27:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (85, 35, 131, 10, 200, 2000, 104, '2026-04-10 16:23:16', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (86, 36, 126, 14, 200, 2800, 145, '2026-04-10 20:19:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (87, 37, 132, 9, 200, 1800, 98, '2026-04-10 20:49:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (88, 38, 135, 10, 200, 2000, 105, '2026-04-10 23:44:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (89, 39, 134, 9, 200, 1800, 90, '2026-04-10 23:45:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (90, 38, 133, 9, 200, 1800, 98, '2026-04-11 02:10:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (91, 39, 136, 11, 200, 2200, 111, '2026-04-11 02:11:01', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (92, 38, 130, 11, 200, 2200, 120, '2026-04-11 04:07:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (93, 38, 124, 12, 200, 2400, 116, '2026-04-11 06:20:36', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (94, 39, 127, 16, 200, 3200, 144, '2026-04-11 06:40:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (95, 40, 137, 10, 200, 2000, 100, '2026-04-13 17:13:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (96, 40, 125, 7, 200, 1400, 64, '2026-04-13 20:15:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (100, 42, 139, 17, 500, 8500, 5, '2026-04-14 16:39:03', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (102, 44, 142, 4, 1000, 4000, 76, '2026-04-14 19:35:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (103, 44, 143, 5, 1000, 5000, 83, '2026-04-14 20:57:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (104, 42, 138, 16, 500, 8000, 5, '2026-04-15 12:56:02', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (106, 46, 141, 14, 330, 4620, 5, '2026-04-15 16:31:47', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (107, 47, 149, 6, 1000, 6000, 97, '2026-04-15 18:16:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (108, 47, 147, 5, 1000, 5000, 96, '2026-04-15 18:28:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (109, 47, 148, 5, 1000, 5000, 89, '2026-04-15 18:32:18', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (110, 51, 152, 6, 1000, 6000, 79, '2026-04-15 20:51:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (111, 46, 140, 11, 330, 3630, 5, '2026-04-15 20:53:03', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (112, 52, 155, 7, 1000, 7000, 108, '2026-04-17 06:06:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (113, 52, 163, 7, 1000, 7000, 96, '2026-04-17 06:07:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (114, 53, 161, 5, 4000, 20000, 100, '2026-04-17 11:24:55', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (115, 53, 166, 3, 4000, 12000, 83, '2026-04-17 11:25:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (116, 54, 162, 4, 4000, 16000, 59, '2026-04-20 20:48:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (117, 54, 167, 2, 4000, 8000, 40, '2026-04-20 20:48:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (119, 55, 188, 5, 500, 2500, 115, '2026-04-21 20:07:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (120, 55, 190, 4, 500, 2000, 107, '2026-04-21 21:21:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (122, 56, 165, 8, 1000, 8000, 95, '2026-04-22 03:59:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (123, 57, 191, 8, 500, 4000, 102, '2026-04-22 05:29:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (124, 57, 184, 11, 500, 5500, 119, '2026-04-22 07:12:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (125, 58, 186, 8, 500, 4000, 106, '2026-04-22 13:33:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (126, 59, 192, 5, 100, 500, 63, '2026-04-22 13:45:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (127, 58, 185, 9, 500, 4500, 108, '2026-04-22 15:26:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (128, 60, 200, 2, 2500, 5000, 29, '2026-04-22 16:51:01', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (129, 60, 206, 2, 2500, 5000, 40, '2026-04-22 16:51:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (130, 58, 187, 7, 500, 3500, 95, '2026-04-22 17:16:32', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (131, 58, 189, 1, 500, 500, 15, '2026-04-22 19:29:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (132, 61, 198, 5, 1000, 5000, 62, '2026-04-22 20:54:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (133, 62, 93, 8, 500, 4000, 64, '2026-04-22 21:00:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (134, 56, 145, 2, 1000, 2000, 71, '2026-04-22 22:35:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (135, 63, 197, 8, 1000, 8000, 94, '2026-04-23 01:07:38', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (136, 63, 196, 6, 500, 3000, 68, '2026-04-23 02:44:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (137, 64, 194, 8, 500, 4000, 94, '2026-04-23 05:27:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (138, 64, 193, 6, 500, 3000, 76, '2026-04-23 06:58:34', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (139, 64, 195, 4, 500, 2000, 40, '2026-04-23 07:41:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (140, 65, 153, 5, 1000, 5000, 77, '2026-04-23 13:53:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (141, 66, 223, 2, 2500, 5000, 26, '2026-04-23 14:02:34', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (142, 66, 221, 2, 2500, 5000, 27, '2026-04-23 14:02:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (143, 65, 150, 6, 1000, 6000, 72, '2026-04-23 15:33:20', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (144, 65, 151, 4, 1000, 4000, 83, '2026-04-23 17:02:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (145, 67, 217, 4, 500, 2000, 67, '2026-04-23 19:55:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (146, 67, 219, 4, 500, 2000, 65, '2026-04-23 19:56:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (147, 68, 146, 5, 2000, 10000, 88, '2026-04-23 21:02:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (148, 69, 234, 11, 200, 2200, 112, '2026-04-24 07:41:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (149, 69, 237, 10, 200, 2000, 100, '2026-04-24 07:43:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (150, 69, 230, 11, 200, 2200, 108, '2026-04-24 07:44:32', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (151, 70, 222, 14, 200, 2800, 140, '2026-04-24 07:46:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (152, 70, 224, 11, 200, 2200, 110, '2026-04-24 07:47:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (153, 70, 229, 10, 200, 2000, 102, '2026-04-24 07:47:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (154, 72, 235, 8, 200, 1600, 73, '2026-04-24 11:34:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (155, 72, 238, 9, 200, 1800, 120, '2026-04-24 14:42:58', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (156, 73, 239, 12, 200, 2400, 115, '2026-04-24 14:48:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (157, 72, 240, 8, 200, 1600, 77, '2026-04-24 16:25:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (158, 73, 241, 10, 200, 2000, 105, '2026-04-24 17:00:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (159, 72, 227, 9, 200, 1800, 95, '2026-04-24 20:31:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (160, 73, 242, 10, 200, 2000, 104, '2026-04-24 20:48:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (161, 75, 245, 8, 200, 1600, 75, '2026-04-24 01:41:25', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (162, 75, 244, 10, 200, 2000, 96, '2026-04-24 01:42:09', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (163, 77, 232, 9, 200, 1800, 85, '2026-04-24 01:44:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (164, 77, 243, 10, 200, 2000, 108, '2026-04-24 01:47:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (165, 75, 246, 8, 200, 1600, 93, '2026-04-24 03:42:16', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (166, 75, 247, 8, 200, 1600, 72, '2026-04-24 05:19:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (167, 78, 205, 10, 200, 2000, 99, '2026-04-24 05:53:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (168, 78, 207, 11, 200, 2200, 113, '2026-04-24 05:54:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (169, 79, 211, 10, 200, 2000, 101, '2026-04-27 15:20:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (170, 80, 214, 1, 2500, 2500, 26, '2026-04-27 15:31:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (171, 79, 203, 12, 200, 2400, 124, '2026-04-27 18:55:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (172, 79, 209, 11, 200, 2200, 111, '2026-04-27 20:47:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (173, 81, 248, 10, 200, 2000, 105, '2026-04-28 06:11:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (174, 81, 251, 10, 200, 2000, 112, '2026-04-28 11:10:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (175, 82, 213, 5, 500, 2500, 55, '2026-04-28 19:06:40', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (176, 83, 283, 7, 200, 1400, 78, '2026-04-30 03:44:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (177, 84, 286, 8, 200, 1600, 70, '2026-04-30 04:07:34', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (178, 83, 284, 12, 200, 2400, 115, '2026-04-30 05:57:17', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (179, 84, 287, 12, 200, 2400, 109, '2026-04-30 06:40:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (182, 87, 285, 9, 200, 1800, 96, '2026-04-30 12:39:16', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (183, 87, 276, 13, 200, 2600, 138, '2026-04-30 12:40:52', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (184, 88, 275, 10, 200, 2000, 117, '2026-04-30 12:42:39', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (185, 90, 281, 8, 200, 1600, 80, '2026-04-30 12:48:59', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (187, 90, 279, 12, 200, 2400, 117, '2026-04-30 12:50:55', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (188, 90, 278, 10, 200, 2000, 109, '2026-04-30 12:51:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (189, 92, 252, 9, 200, 1800, 96, '2026-04-30 12:55:04', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (190, 92, 253, 11, 200, 2200, 105, '2026-04-30 12:55:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (191, 93, 292, 12, 200, 2400, 126, '2026-04-30 13:07:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (192, 94, 282, 10, 200, 2000, 102, '2026-04-30 13:12:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (193, 94, 277, 11, 200, 2200, 112, '2026-04-30 13:12:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (194, 95, 274, 9, 200, 1800, 105, '2026-04-30 13:13:40', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (195, 95, 273, 9, 200, 1800, 91, '2026-04-30 13:14:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (196, 96, 280, 11, 200, 2200, 123, '2026-04-30 13:16:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (197, 97, 271, 11, 200, 2200, 107, '2026-04-30 13:24:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (198, 97, 256, 10, 200, 2000, 103, '2026-04-30 13:24:54', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (199, 97, 249, 10, 200, 2000, 110, '2026-04-30 13:25:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (200, 97, 250, 9, 200, 1800, 98, '2026-04-30 13:25:39', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (201, 98, 291, 13, 200, 2600, 130, '2026-04-30 13:31:04', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (202, 82, 215, 1, 500, 500, 54, '2026-04-30 14:50:04', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (203, 102, 208, 2, 2000, 4000, 42, '2026-04-30 15:32:31', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (204, 99, 272, 10, 200, 2000, 100, '2026-04-30 16:03:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (205, 104, 295, 11, 200, 2200, 118, '2026-04-30 21:31:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (206, 104, 306, 10, 200, 2000, 102, '2026-04-30 21:32:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (207, 104, 298, 13, 200, 2600, 129, '2026-04-30 21:33:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (208, 105, 299, 12, 200, 2400, 125, '2026-04-30 21:36:44', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (209, 105, 312, 10, 200, 2000, 106, '2026-04-30 21:37:05', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (210, 105, 309, 8, 200, 1600, 87, '2026-04-30 21:37:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (211, 106, 316, 11, 200, 2200, 109, '2026-05-04 14:49:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (212, 107, 296, 12, 200, 2400, 108, '2026-05-04 15:13:54', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (213, 107, 323, 6, 200, 1200, 62, '2026-05-04 16:48:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (214, 106, 289, 11, 200, 2200, 117, '2026-05-04 17:22:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (215, 108, 144, 5, 1000, 5000, 92, '2026-05-04 19:50:44', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (216, 107, 288, 12, 200, 2400, 126, '2026-05-04 20:56:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (217, 106, 308, 11, 200, 2200, 109, '2026-05-04 21:34:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (218, 108, 154, 5, 1000, 5000, 84, '2026-05-05 13:06:04', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (219, 109, 305, 11, 200, 2200, 109, '2026-05-05 14:48:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (220, 111, 164, 14, 1000, 14000, 93, '2026-05-05 16:28:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (221, 109, 302, 11, 200, 2200, 110, '2026-05-05 17:18:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (222, 112, 335, 9, 200, 1800, 90, '2026-05-05 17:22:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (223, 112, 336, 8, 200, 1600, 80, '2026-05-05 19:38:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (224, 109, 320, 9, 200, 1800, 101, '2026-05-05 19:40:05', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (225, 113, 339, 9, 200, 1800, 90, '2026-05-05 21:26:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (228, 115, 270, 8, 200, 1600, 85, '2026-05-06 03:27:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (229, 115, 303, 10, 200, 2000, 103, '2026-05-06 05:47:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (230, 116, 345, 10, 200, 2000, 102, '2026-05-06 05:49:43', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (233, 117, 342, 9, 200, 1800, 90, '2026-05-06 05:53:43', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (234, 117, 347, 10, 200, 2000, 105, '2026-05-06 05:54:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (235, 116, 353, 13, 200, 2600, 130, '2026-05-06 09:09:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (236, 117, 350, 11, 200, 2200, 101, '2026-05-06 09:34:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (237, 118, 357, 11, 200, 2200, 117, '2026-05-06 14:27:56', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (238, 118, 361, 9, 200, 1800, 100, '2026-05-06 16:32:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (239, 118, 359, 12, 200, 2400, 124, '2026-05-06 19:02:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (240, 119, 344, 8, 445, 3560, 10, '2026-05-06 22:52:37', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (241, 119, 340, 8, 445, 3560, 10, '2026-05-07 01:08:59', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (242, 119, 337, 7, 445, 3115, 10, '2026-05-07 02:32:02', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (243, 119, 334, 7, 445, 3115, 10, '2026-05-07 04:07:57', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (244, 120, 348, 4, 2000, 8000, 85, '2026-05-07 05:07:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (245, 120, 374, 4, 2000, 8000, 94, '2026-05-07 05:08:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (246, 120, 377, 2, 2000, 4000, 73, '2026-05-07 07:10:40', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (247, 121, 365, 9, 200, 1800, 93, '2026-05-07 07:21:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (248, 121, 371, 6, 200, 1200, 65, '2026-05-07 07:21:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (249, 122, 384, 5, 1000, 5000, 42, '2026-05-07 07:33:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (250, 123, 390, 11, 200, 2200, 118, '2026-05-07 14:31:06', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (251, 123, 394, 11, 200, 2200, 110, '2026-05-07 17:11:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (252, 124, 366, 4, 2000, 8000, 82, '2026-05-07 19:41:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (253, 125, 382, 6, 300, 1800, 118, '2026-05-07 20:15:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (254, 125, 379, 4, 300, 1200, 87, '2026-05-07 20:16:06', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (256, 126, 398, 11, 200, 2200, 122, '2026-05-08 05:54:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (257, 126, 401, 10, 200, 2000, 109, '2026-05-08 05:54:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (258, 126, 404, 9, 200, 1800, 91, '2026-05-08 05:55:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (259, 127, 370, 5, 300, 1500, 92, '2026-05-08 06:05:36', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (261, 127, 376, 7, 300, 2100, 105, '2026-05-08 06:07:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (262, 127, 373, 5, 300, 1500, 94, '2026-05-08 06:08:17', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (263, 126, 418, 12, 200, 2400, 122, '2026-05-08 07:22:01', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (264, 128, 429, 9, 200, 1800, 100, '2026-05-08 14:31:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (265, 129, 422, 15, 200, 3000, 150, '2026-05-08 15:36:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (266, 129, 437, 7, 200, 1400, 70, '2026-05-08 17:13:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (267, 128, 425, 13, 200, 2600, 127, '2026-05-08 18:26:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (268, 130, 399, 7, 100, 700, 122, '2026-05-08 18:51:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (269, 130, 396, 4, 100, 400, 87, '2026-05-08 18:51:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (270, 129, 436, 10, 200, 2000, 113, '2026-05-08 20:20:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (271, 132, 441, 11, 200, 2200, 106, '2026-05-08 21:09:47', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (272, 130, 391, 5, 100, 500, 115, '2026-05-08 21:21:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (273, 133, 443, 8, 200, 1600, 80, '2026-05-08 21:50:12', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (301, 134, 444, 10, 200, 2000, 102, '2026-05-09 07:47:10', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (302, 134, 447, 8, 200, 1600, 81, '2026-05-09 07:47:39', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (303, 134, 448, 9, 200, 1800, 95, '2026-05-09 07:48:06', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (304, 134, 450, 10, 200, 2000, 91, '2026-05-09 07:48:47', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (305, 134, 452, 5, 200, 1000, 54, '2026-05-09 07:49:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (306, 135, 445, 11, 200, 2200, 105, '2026-05-09 07:51:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (307, 135, 446, 10, 200, 2000, 102, '2026-05-09 07:52:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (308, 135, 449, 10, 200, 2000, 99, '2026-05-09 07:52:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (309, 135, 451, 10, 200, 2000, 97, '2026-05-09 07:53:05', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (311, 130, 386, 5, 100, 500, 101, '2026-05-11 15:27:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (312, 130, 393, 4, 100, 400, 85, '2026-05-11 19:00:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (313, 136, 409, 4, 250, 1000, 62, '2026-05-11 19:30:06', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (314, 136, 412, 3, 250, 750, 60, '2026-05-11 19:30:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (315, 136, 414, 4, 250, 1000, 67, '2026-05-11 19:31:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (316, 136, 416, 3, 250, 750, 53, '2026-05-11 19:32:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (317, 136, 420, 3, 250, 750, 60, '2026-05-11 19:33:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (328, 137, 453, 5, 200, 1000, 61, '2026-05-11 19:48:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (375, 138, 458, 9, 200, 1800, 92, '2026-05-12 06:10:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (376, 139, 457, 9, 200, 1800, 92, '2026-05-12 06:21:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (377, 138, 461, 9, 200, 1800, 106, '2026-05-12 08:11:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (378, 139, 462, 9, 200, 1800, 91, '2026-05-12 08:30:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (379, 138, 464, 11, 200, 2200, 113, '2026-05-12 11:14:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (380, 139, 465, 12, 200, 2400, 133, '2026-05-12 11:32:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (381, 140, 405, 2, 4000, 8000, 15.5, '2026-05-12 13:15:54', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (382, 140, 407, 1, 4000, 4000, 15.5, '2026-05-12 13:17:59', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (383, 130, 388, 2, 100, 200, 48, '2026-05-12 13:56:00', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (384, 141, 408, 3, 250, 750, 59, '2026-05-12 15:23:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (386, 140, 402, 1, 4000, 4000, 15.5, '2026-05-12 15:46:03', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (387, 140, 400, 2, 4000, 8000, 15.5, '2026-05-12 15:46:44', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (389, 140, 397, 2, 4000, 8000, 15.5, '2026-05-12 19:40:52', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (390, 140, 410, 1, 4000, 4000, 15.5, '2026-05-12 19:41:30', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (392, 143, 463, 12, 200, 2400, 105, '2026-05-12 21:52:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (393, 143, 472, 13, 200, 2600, 120, '2026-05-12 21:53:33', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (394, 143, 471, 10, 200, 2000, 96, '2026-05-12 21:56:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (395, 145, 467, 9, 200, 1800, 90, '2026-05-13 02:39:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (399, 144, 466, 9, 200, 1800, 107, '2026-05-13 04:07:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (400, 145, 480, 12, 200, 2400, 122, '2026-05-13 05:40:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (401, 144, 468, 10, 200, 2000, 108, '2026-05-13 06:40:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (402, 145, 469, 9, 200, 1800, 90, '2026-05-13 07:59:32', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (403, 144, 460, 10, 200, 2000, 104, '2026-05-13 08:55:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (404, 145, 474, 10, 200, 2000, 102, '2026-05-13 10:26:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (405, 144, 478, 9, 200, 1800, 90, '2026-05-13 11:25:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (406, 140, 395, 2, 4000, 8000, 15.5, '2026-05-13 12:46:28', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (408, 140, 389, 1, 4000, 4000, 15.5, '2026-05-13 14:47:07', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (409, 140, 387, 1, 4000, 4000, 15.5, '2026-05-13 14:47:48', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (410, 140, 415, 2, 4000, 8000, 15.5, '2026-05-13 16:37:52', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (411, 140, 385, 1, 4000, 4000, 15.5, '2026-05-13 16:38:32', 1, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (413, 147, 473, 11, 200, 2200, 115, '2026-05-13 19:25:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (414, 147, 470, 10, 200, 2000, 99, '2026-05-13 19:26:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (415, 147, 476, 9, 200, 1800, 94, '2026-05-13 19:27:12', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (419, 140, 392, 2, 4000, 8000, 16, '2026-05-13 19:51:58', 1, 1, 0, 16);
INSERT INTO `produccion_selladora_detalle` VALUES (422, 140, 413, 1, 4000, 4000, 17, '2026-05-13 20:14:22', 1, 1, 0, 17);
INSERT INTO `produccion_selladora_detalle` VALUES (423, 146, 459, 3, 1000, 3000, 67, '2026-05-13 20:17:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (424, 146, 456, 5, 1000, 5000, 79, '2026-05-13 20:18:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (425, 146, 454, 4, 1000, 4000, 88, '2026-05-13 20:19:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (426, 146, 454, 1, 690, 690, 13, '2026-05-13 20:20:14', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (427, 148, 491, 11, 200, 2200, 109, '2026-05-13 20:29:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (428, 148, 494, 10, 200, 2000, 104, '2026-05-13 20:29:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (431, 149, 497, 10, 200, 2000, 96, '2026-05-14 05:12:18', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (432, 149, 502, 10, 200, 2000, 109, '2026-05-14 07:30:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (433, 150, 498, 2, 2000, 4000, 41, '2026-05-14 10:26:59', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (434, 150, 495, 3, 2000, 6000, 54, '2026-05-14 10:29:30', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (435, 150, 500, 2, 2000, 4000, 23, '2026-05-14 11:09:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (436, 149, 504, 6, 200, 1200, 50, '2026-05-14 11:21:24', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (439, 153, 421, 3, 250, 750, 61, '2026-05-14 14:38:43', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (440, 153, 417, 2, 250, 500, 60, '2026-05-14 14:40:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (441, 153, 417, 1, 225, 225, 16, '2026-05-14 14:42:12', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (448, 152, 364, 1, 3000, 3000, 19, '2026-05-14 15:21:30', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (449, 152, 367, 2, 3000, 6000, 19, '2026-05-14 15:26:49', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (450, 152, 375, 1, 3000, 3000, 19, '2026-05-14 15:27:56', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (451, 152, 378, 1, 3000, 3000, 19, '2026-05-14 15:28:48', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (452, 154, 493, 3, 200, 600, 51, '2026-05-14 17:08:36', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (454, 152, 372, 1, 3000, 3000, 19, '2026-05-14 19:02:13', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (455, 152, 381, 2, 3000, 6000, 19, '2026-05-14 19:03:06', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (456, 154, 492, 2, 250, 500, 45, '2026-05-14 19:39:31', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (457, 154, 489, 2, 250, 500, 34, '2026-05-14 19:52:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (461, 154, 490, 2, 250, 500, 27, '2026-05-14 20:13:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (462, 156, 504, 8, 200, 1600, 80, '2026-05-14 20:40:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (463, 156, 509, 12, 200, 2400, 126, '2026-05-14 20:40:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (464, 156, 506, 14, 200, 2800, 135, '2026-05-14 20:41:18', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (465, 152, 369, 2, 3000, 6000, 19, '2026-05-14 20:49:43', 1, 1, 0, 19);
INSERT INTO `produccion_selladora_detalle` VALUES (466, 152, 362, 1, 2000, 2000, 13, '2026-05-14 20:52:19', 1, 1, 0, 13);
INSERT INTO `produccion_selladora_detalle` VALUES (468, 156, 488, 5, 200, 1000, 45, '2026-05-14 20:59:02', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (469, 158, 496, 9, 200, 1800, 106, '2026-05-15 04:50:27', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (470, 158, 484, 12, 200, 2400, 130, '2026-05-15 08:21:05', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (471, 159, 488, 9, 200, 1800, 77, '2026-05-15 08:23:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (472, 159, 486, 12, 200, 2400, 122, '2026-05-15 08:39:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (473, 160, 380, 6, 1000, 6000, 76, '2026-05-15 11:47:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (474, 160, 368, 4, 1000, 4000, 60, '2026-05-15 11:49:18', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (475, 161, 368, 1, 1000, 1000, 15, '2026-05-15 11:54:06', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (476, 158, 483, 12, 200, 2400, 110, '2026-05-15 11:57:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (477, 162, 501, 10, 200, 2000, 90, '2026-05-15 13:54:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (478, 163, 499, 6, 200, 1200, 54, '2026-05-15 13:58:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (479, 166, 490, 1, 200, 200, 28, '2026-05-15 15:50:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (480, 166, 487, 3, 200, 600, 50, '2026-05-15 15:51:20', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (481, 164, 524, 13, 200, 2600, 130, '2026-05-15 16:35:29', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (482, 165, 518, 10, 200, 2000, 107, '2026-05-15 16:36:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (483, 127, 373, 1, 80, 80, 4.7, '2026-05-15 17:31:57', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (484, 165, 526, 11, 200, 2200, 109, '2026-05-15 19:12:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (485, 164, 528, 11, 200, 2200, 108, '2026-05-15 20:06:35', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (486, 164, 516, 6, 200, 1200, 54, '2026-05-15 20:18:53', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (487, 165, 529, 9, 200, 1800, 81, '2026-05-15 20:29:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (488, 130, 388, 1, 60, 60, 12.6, '2026-05-15 20:48:54', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (489, 168, 516, 3, 200, 600, 43, '2026-05-16 02:47:57', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (490, 167, 529, 2, 200, 400, 20, '2026-05-16 02:48:46', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (491, 167, 531, 9, 200, 1800, 105, '2026-05-16 04:48:15', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (492, 169, 329, 4, 500, 2000, 52, '2026-05-16 05:05:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (493, 169, 220, 2, 500, 1000, 20, '2026-05-16 05:05:54', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (494, 168, 533, 12, 200, 2400, 113, '2026-05-16 05:14:51', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (495, 168, 512, 11, 200, 2200, 104, '2026-05-16 07:16:26', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (496, 167, 522, 13, 200, 2600, 140, '2026-05-16 07:56:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (497, 170, 532, 3, 2000, 6000, 48, '2026-05-16 08:18:13', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (498, 170, 530, 2, 2000, 4000, 50, '2026-05-16 08:18:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (499, 167, 513, 6, 200, 1200, 55, '2026-05-16 08:44:54', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (500, 168, 515, 5, 200, 1000, 40, '2026-05-16 08:49:25', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (503, 172, 515, 4, 200, 800, 55, '2026-05-18 14:50:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (504, 171, 513, 5, 200, 1000, 46, '2026-05-18 15:50:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (505, 173, 475, 2, 3000, 6000, 44, '2026-05-18 16:26:20', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (506, 172, 510, 11, 200, 2200, 101, '2026-05-18 17:26:01', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (507, 171, 525, 7, 200, 1400, 87, '2026-05-18 19:24:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (508, 174, 355, 6, 1000, 6000, 87, '2026-05-18 21:40:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (509, 174, 360, 1, 1000, 1000, 14, '2026-05-18 21:52:30', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (510, 171, 520, 11, 200, 2200, 112, '2026-05-18 22:05:23', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (511, 175, 479, 11, 200, 2200, 116, '2026-05-18 22:07:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (512, 176, 482, 9, 200, 1800, 87, '2026-05-19 02:27:59', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (513, 177, 477, 10, 200, 2000, 105, '2026-05-19 02:28:57', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (514, 176, 485, 14, 200, 2800, 135, '2026-05-19 04:33:18', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (515, 177, 541, 11, 200, 2200, 107, '2026-05-19 04:34:31', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (516, 176, 481, 11, 200, 2200, 108, '2026-05-19 07:01:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (517, 177, 542, 13, 200, 2600, 125, '2026-05-19 07:25:22', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (518, 176, 539, 7, 200, 1400, 70, '2026-05-19 08:15:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (519, 178, 360, 3, 1000, 3000, 40, '2026-05-19 13:24:16', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (520, 179, 544, 12, 200, 2400, 113, '2026-05-19 15:13:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (521, 179, 547, 9, 200, 1800, 90, '2026-05-19 17:27:30', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (522, 180, 534, 9, 1050, 9450, 40, '2026-05-19 20:07:28', 1, 1, 0, 5);
INSERT INTO `produccion_selladora_detalle` VALUES (523, 179, 546, 10, 200, 2000, 105, '2026-05-19 21:27:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (524, 180, 538, 3, 1050, 3150, 18, '2026-05-19 21:44:09', 1, 1, 0, 5);
INSERT INTO `produccion_selladora_detalle` VALUES (525, 179, 549, 3, 200, 600, 27, '2026-05-19 21:54:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (526, 181, 549, 8, 200, 1600, 73, '2026-05-20 01:51:42', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (527, 181, 548, 11, 200, 2200, 105, '2026-05-20 03:33:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (528, 182, 538, 6, 1050, 6300, 32, '2026-05-20 03:36:02', 1, 1, 0, 5);
INSERT INTO `produccion_selladora_detalle` VALUES (531, 182, 538, 1, 280, 280, 1, '2026-05-20 06:42:17', 1, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (532, 183, 551, 12, 200, 2400, 109, '2026-05-20 06:48:25', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (533, 183, 552, 8, 200, 1600, 68.8, '2026-05-20 06:48:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (534, 184, 358, 6, 1000, 6000, 77, '2026-05-20 06:52:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (535, 186, 363, 5, 1000, 5000, 78, '2026-05-20 12:49:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (536, 186, 363, 1, 390, 390, 6, '2026-05-20 12:52:18', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (538, 187, 231, 2, 1500, 3000, 17, '2026-05-20 14:55:05', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (539, 188, 553, 13, 200, 2600, 132, '2026-05-20 15:41:43', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (540, 185, 556, 10, 200, 2000, 100, '2026-05-20 15:42:32', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (541, 189, 201, 4, 1000, 4000, 102, '2026-05-20 19:27:48', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (542, 185, 557, 11, 200, 2200, 107, '2026-05-20 19:35:03', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (543, 188, 558, 10, 200, 2000, 98, '2026-05-20 19:36:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (545, 188, 559, 10, 200, 2000, 104, '2026-05-20 21:39:16', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (546, 185, 560, 10, 200, 2000, 92, '2026-05-20 22:03:37', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (548, 193, 537, 4, 500, 2000, 64, '2026-05-25 14:45:50', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (549, 194, 561, 6, 200, 1200, 57, '2026-05-25 15:19:19', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (551, 193, 536, 7, 500, 3500, 112, '2026-05-25 16:19:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (552, 193, 535, 5, 500, 2500, 97, '2026-05-25 18:55:43', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (553, 194, 550, 10, 200, 2000, 108, '2026-05-25 19:19:08', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (554, 193, 563, 8, 500, 4000, 120, '2026-05-25 21:03:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (555, 194, 555, 11, 200, 2200, 103, '2026-05-25 21:48:57', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (557, 196, 236, 6, 1000, 6000, 47, '2026-05-26 14:09:30', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (558, 195, 566, 6, 500, 3000, 74, '2026-05-26 14:45:38', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (559, 195, 564, 8, 500, 4000, 90, '2026-05-26 14:45:56', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (560, 197, 574, 2, 1000, 2000, 41, '2026-05-26 15:07:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (561, 197, 573, 3, 1000, 3000, 48, '2026-05-26 15:07:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (562, 195, 567, 5, 500, 2500, 53, '2026-05-26 15:47:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (563, 197, 569, 3, 1000, 3000, 55, '2026-05-26 16:08:59', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (564, 197, 571, 2, 1000, 2000, 42, '2026-05-26 18:49:07', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (565, 197, 575, 1, 1000, 1000, 19, '2026-05-26 18:49:45', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (566, 197, 575, 1, 260, 260, 4, '2026-05-26 18:51:24', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (567, 195, 562, 7, 500, 3500, 83, '2026-05-26 18:53:17', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (568, 195, 199, 9, 500, 4500, 92, '2026-05-26 20:36:09', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (569, 198, 579, 5, 1145, 5725, 50, '2026-05-26 21:59:33', 1, 1, 0, 10);
INSERT INTO `produccion_selladora_detalle` VALUES (570, 199, 594, 7, 1000, 7000, 98, '2026-05-27 13:21:20', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (571, 200, 579, 3, 1145, 3435, 32, '2026-05-27 14:00:04', 1, 1, 0, 10);
INSERT INTO `produccion_selladora_detalle` VALUES (572, 200, 581, 4, 1145, 4580, 40, '2026-05-27 14:00:51', 1, 1, 0, 10);
INSERT INTO `produccion_selladora_detalle` VALUES (573, 199, 352, 5, 1000, 5000, 82, '2026-05-27 14:30:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (574, 199, 598, 6, 1000, 6000, 87, '2026-05-27 16:01:41', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (575, 199, 600, 2, 1000, 2000, 22, '2026-05-27 16:24:38', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (576, 201, 600, 2, 1000, 2000, 29, '2026-05-27 17:01:44', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (577, 202, 554, 12, 200, 2400, 124, '2026-05-27 17:09:00', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (578, 200, 577, 8, 1145, 9160, 82, '2026-05-27 17:12:22', 1, 1, 0, 10);
INSERT INTO `produccion_selladora_detalle` VALUES (579, 201, 602, 5, 1000, 5000, 56, '2026-05-27 19:51:28', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (580, 201, 596, 3, 1000, 3000, 38, '2026-05-27 20:32:11', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (581, 199, 596, 2, 1000, 2000, 30, '2026-05-27 20:57:17', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (582, 199, 596, 1, 650, 650, 9, '2026-05-27 20:58:29', 0, 1, 1, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (583, 203, 595, 9, 200, 1800, 101, '2026-05-27 21:22:04', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (584, 203, 601, 3, 200, 600, 27, '2026-05-27 21:50:41', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (585, 204, 517, 3, 3000, 9000, 49, '2026-05-27 21:56:09', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (586, 206, 601, 7, 200, 1400, 70, '2026-05-28 13:24:02', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (587, 208, 519, 3, 3000, 9000, 48, '2026-05-28 13:45:59', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (589, 205, 614, 13, 200, 2600, 132, '2026-05-28 15:05:19', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (590, 206, 620, 9, 200, 1800, 90, '2026-05-28 15:43:49', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (591, 205, 588, 12, 200, 2400, 120, '2026-05-28 17:43:52', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (592, 206, 593, 11, 200, 2200, 112, '2026-05-28 18:41:09', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (593, 208, 503, 3, 3000, 9000, 52, '2026-05-28 19:21:49', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (594, 208, 527, 3, 3000, 9000, 46, '2026-05-28 19:22:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (595, 205, 584, 9, 200, 1800, 99, '2026-05-28 20:10:26', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (596, 207, 552, 4, 200, 800, 45.2, '2026-05-28 20:49:21', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (597, 209, 591, 4, 1000, 4000, 78, '2026-05-28 20:57:14', 0, 1, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (598, 206, 586, 12, 200, 2400, 116, '2026-05-28 21:21:04', 0, 0, 0, NULL);
INSERT INTO `produccion_selladora_detalle` VALUES (599, 205, 592, 5, 200, 1000, 50, '2026-05-28 21:26:52', 0, 0, 0, NULL);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  `tipo_maquina_id` int NOT NULL,
  `tipo_producto_id` int NOT NULL,
  `u_medida_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tipo_maquina_id`(`tipo_maquina_id` ASC) USING BTREE,
  INDEX `tipo_producto_id`(`tipo_producto_id` ASC) USING BTREE,
  INDEX `u_medida_id`(`u_medida_id` ASC) USING BTREE,
  INDEX `ix_productos_id`(`id` ASC) USING BTREE,
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`tipo_maquina_id`) REFERENCES `tipo_maquinas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tipo_producto_id`) REFERENCES `tipo_productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`u_medida_id`) REFERENCES `u_medidas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 564 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, 'RLL', 'Rollo', 1, 1, 1, 1);
INSERT INTO `productos` VALUES (2, 'MNG', 'Manga', 1, 1, 3, 1);
INSERT INTO `productos` VALUES (3, 'FND', 'Funda', 1, 1, 2, 1);
INSERT INTO `productos` VALUES (4, 'LMN', 'Lamina', 1, 1, 3, 1);
INSERT INTO `productos` VALUES (5, 'PCH', 'Pechera', 1, 2, 1, 2);
INSERT INTO `productos` VALUES (6, 'BLS', 'Bolsa', 1, 2, 5, 2);
INSERT INTO `productos` VALUES (7, 'BLSBSR', 'Bolsa Basura', 1, 2, 5, 2);
INSERT INTO `productos` VALUES (8, 'ETQ', 'Etiqueta', 1, 2, 1, 2);
INSERT INTO `productos` VALUES (9, 'FL', 'Folio', 1, 2, 2, 2);
INSERT INTO `productos` VALUES (10, 'MNG', 'MANGA', 1, 2, 3, 2);
INSERT INTO `productos` VALUES (11, 'FND', 'Funda', 1, 2, 6, 2);
INSERT INTO `productos` VALUES (555, '11', 'LAMINA PREPÍCADA', 1, 1, 2, 1);
INSERT INTO `productos` VALUES (556, '12', 'Manga prep.', 1, 1, 3, 1);
INSERT INTO `productos` VALUES (557, '11', 'FUNDA', 1, 2, 6, 2);
INSERT INTO `productos` VALUES (559, 'LM', 'Lamina', 1, 2, 2, 2);
INSERT INTO `productos` VALUES (560, 'BPP', 'BOLSA PREPICADA', 1, 2, 5, 1);
INSERT INTO `productos` VALUES (561, 'EM', 'EMPAQUE FRYS', 1, 1, 5, 1);
INSERT INTO `productos` VALUES (562, 'll', 'LAMINA PREPÍCADA', 1, 2, 2, 1);
INSERT INTO `productos` VALUES (563, '4', ' Rollo Etiqueta', 1, 1, 5, 1);

-- ----------------------------
-- Table structure for tipo_maquinas
-- ----------------------------
DROP TABLE IF EXISTS `tipo_maquinas`;
CREATE TABLE `tipo_maquinas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_tipo_maquinas_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_maquinas
-- ----------------------------
INSERT INTO `tipo_maquinas` VALUES (1, 'Extrusora');
INSERT INTO `tipo_maquinas` VALUES (2, 'Selladora');

-- ----------------------------
-- Table structure for tipo_productos
-- ----------------------------
DROP TABLE IF EXISTS `tipo_productos`;
CREATE TABLE `tipo_productos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_tipo_productos_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipo_productos
-- ----------------------------
INSERT INTO `tipo_productos` VALUES (5, 'Bolsas');
INSERT INTO `tipo_productos` VALUES (6, 'Fundas');
INSERT INTO `tipo_productos` VALUES (2, 'Laminas');
INSERT INTO `tipo_productos` VALUES (3, 'Mangas');
INSERT INTO `tipo_productos` VALUES (4, 'Pecheras');
INSERT INTO `tipo_productos` VALUES (1, 'Rolllos');

-- ----------------------------
-- Table structure for u_medidas
-- ----------------------------
DROP TABLE IF EXISTS `u_medidas`;
CREATE TABLE `u_medidas`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `nombre`(`nombre` ASC) USING BTREE,
  INDEX `ix_u_medidas_id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of u_medidas
-- ----------------------------
INSERT INTO `u_medidas` VALUES (1, 'Kilogramo');
INSERT INTO `u_medidas` VALUES (3, 'Metro');
INSERT INTO `u_medidas` VALUES (2, 'Unidad');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  `perfil_id` int NOT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ix_usuarios_email`(`email` ASC) USING BTREE,
  INDEX `perfil_id`(`perfil_id` ASC) USING BTREE,
  INDEX `ix_usuarios_id`(`id` ASC) USING BTREE,
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`perfil_id`) REFERENCES `perfiles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (5, 'Jose Cid', 'jose@comercialfrys.cl', '$2b$12$Z3KtENQq3bqy38q530pXfuO42RxwAYKSP6gBez9FDEyiYwxW62TJ.', 1, 1, '2026-03-10 21:32:30', '2026-03-26 21:10:50');
INSERT INTO `usuarios` VALUES (6, 'Pablo cardenas', 'pablo@comercialfrys.cl', '$2b$12$kvFdSNN2xI/zwuzodz9BpeKzi1TuDoqVMqEVTNJF.ATVzXRUFcX1y', 1, 3, '2026-03-30 21:56:54', '2026-03-31 15:09:27');
INSERT INTO `usuarios` VALUES (7, 'Mauricio Monserrat', 'mauricio@comercialfrys.cl', '$2b$12$w6ria4qTFD/D.JAA4c5Gx.966mVDo0Vef3iFdYrtXvDbk7LWZtz8G', 1, 3, '2026-04-01 15:43:37', NULL);
INSERT INTO `usuarios` VALUES (8, 'Renzo Molina', 'rmolina@comercialfrys.cl', '$2b$12$dC.RjbizGr.pbAti/P6Vz.RwE6j3j/Zt5pkuKKBfYUjRolNzIUBcy', 1, 1, '2026-04-01 21:08:11', NULL);
INSERT INTO `usuarios` VALUES (9, 'Rodrigo Aguilera', 'rodrigo@comercialfrys.cl', '$2b$12$DFdUKlTGcHup3YCFciDOVO.9mwikVZsFaTk4hgDv5K8jnqQoJoKT2', 1, 3, '2026-04-02 15:41:30', '2026-04-02 15:42:07');
INSERT INTO `usuarios` VALUES (10, 'Cristian Benavides', 'cristian@comercialfrys.cl', '$2b$12$bsVXw8sAtOXDmstEDQeum./K0hcjSJMZk1GT/mLnxZTCzy.esCNni', 1, 3, '2026-04-02 15:43:51', '2026-04-02 15:44:04');
INSERT INTO `usuarios` VALUES (11, 'Raul Araya', 'gestion@comercialfrys.cl', '$2b$12$JfQKVmPzEHBcgAodRg15vuvWlIHHJuMLRLwgvNLMOjQK2IrwtwkU.', 1, 1, '2026-04-02 15:44:52', NULL);
INSERT INTO `usuarios` VALUES (12, 'Administrador', 'admin@comercialfrys.cl', '$2b$12$JpA/NjudlZt.s0gOKMSOneRB5j2dm97sERkZvdm.mWzdNF9MgyNAK', 1, 1, '2026-04-06 21:10:12', NULL);
INSERT INTO `usuarios` VALUES (13, 'Patricio Diaz', 'bodega@comercialfrys.cl', '$2b$12$Lcsfp.l.vuCaDZqZUXhAKenRbmhTQf3WgZOV2WM0Qx.UqzvqWffo2', 1, 1, '2026-05-28 21:15:41', NULL);

SET FOREIGN_KEY_CHECKS = 1;
