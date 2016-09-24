const HeroType = cc.Enum({
    WARRIORS: 0,
    RANGERS : 1,
    MAGES   : 2,
    
});

const FoeType = cc.Enum({
    
});

const BossType = cc.Enum({
    
});

const ProjectileType = cc.Enum({
    Arrow: -1,
    Fireball: -1,
    None: 999
});

module.exports = {
    HeroType,
    BossType,
    FoeType,
    ProjectileType
};