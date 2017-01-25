#!/bin/bash
one="\\$1"
two="\\$2"
str="\xFF$one$two"
echo -e $str > /dev/ttyUSB0
