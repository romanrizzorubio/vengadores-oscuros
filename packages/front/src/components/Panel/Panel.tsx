import { HTMLAttributes, useMemo } from 'react';
import { Img, Wrapper, Text, ProgressPanel } from './Panel.styles';
import imgSuperLife from '../../assets/super-life.jpg';
import imgSuperPlan from '../../assets/super-plan.jpg';
import imgSpiderWoman from '../../assets/spiderwoman.jpg';
import imgSuperLose from '../../assets/super-lose.jpg';
import imgSuperWin from '../../assets/super-win.jpg';
import imgVeranke from '../../assets/veranke.jpg';
import imgShipFall from '../../assets/ship-fall.jpg';
import imgShipOpen from '../../assets/ship-open.jpg';
import imgEnemy from '../../assets/enemy.jpg';
import imgQueen from '../../assets/queen.jpg';
import imgOsborn from '../../assets/osborn.jpg';
import imgElcalaMal from '../../assets/elcalamal.png';
import imgDarkReign from '../../assets/reinado-oscuro.jpg';
import imgDarkAvengers from '../../assets/vengadores-oscuros.jpg';
import imgKingdomDefeated from '../../assets/reinado-derrotado.jpg';
import imgIronPatriot from '../../assets/iron-patriot.jpg';
import imgDescubiertos from '../../assets/descubiertos.jpg';
import imgCapitanAmerica from '../../assets/capitan-america.jpg';
import imgNormanOsborn from '../../assets/norman-osborn.jpg';
import { PanelType, PanelTypeDict } from '../../types/Dicts';
import { Progress, ProgressProps } from '../../ui/Progress/Progress';
import { Controls, ControlsProps } from '../Controls/Controls';
import { Button, ButtonProps } from '../../ui/Button/Button';

export type PanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  type: PanelType;
  progress?: ProgressProps | ProgressProps[];
  msg?: string;
  controls?: ControlsProps;
  buttons?: ButtonProps | ButtonProps[];
  disabled?: boolean;
  hasBackground?: boolean;
};

export const Panel = ({
  type,
  progress,
  msg,
  controls,
  buttons,
  disabled = false,
  hasBackground = false,
}: PanelProps) => {
  const img = useMemo(() => {
    const imgMap = {
      [PanelTypeDict.SUPER]: imgSuperLife,
      [PanelTypeDict.SUPER_PLAN]: imgSuperPlan,
      [PanelTypeDict.SPIDER_WOMAN_LEAVES]: imgSpiderWoman,
      [PanelTypeDict.SUPER_DEFEATED]: imgSuperLose,
      [PanelTypeDict.SUPER_WINER]: imgSuperWin,
      [PanelTypeDict.VERANKE]: imgVeranke,
      [PanelTypeDict.SHIP_FALL]: imgShipFall,
      [PanelTypeDict.SHIP_OPEN]: imgShipOpen,
      [PanelTypeDict.ENEMY]: imgEnemy,
      [PanelTypeDict.QUEEN]: imgQueen,
      [PanelTypeDict.OSBORN]: imgOsborn,
      [PanelTypeDict.ELCALA_MAL]: imgElcalaMal,
      [PanelTypeDict.DARK_REIGN]: imgDarkReign,
      [PanelTypeDict.DARK_AVENGERS]: imgDarkAvengers,
      [PanelTypeDict.KINGDOM_DEFEATED]: imgKingdomDefeated,
      [PanelTypeDict.IRON_PATRIOT]: imgIronPatriot,
      [PanelTypeDict.EXPOSED]: imgDescubiertos,
      [PanelTypeDict.CAPTAIN_AMERICA]: imgCapitanAmerica,
      [PanelTypeDict.NORMAN_OSBORN]: imgNormanOsborn,
    };
    return imgMap[type];
  }, [type]);

  return (
    <Wrapper $img={img}>
      {msg && <Text>{msg}</Text>}
      <Img src={img} alt="" disabled={disabled} />
      <ProgressPanel>
        {progress &&
          (progress instanceof Array ? (
            progress.map((p, index) => (
              <Progress key={`progress-${index}`} {...p} hasBackground={hasBackground} />
            ))
          ) : (
            <Progress {...progress} hasBackground={hasBackground} />
          ))}
      </ProgressPanel>
      {controls && <Controls {...controls} />}
      {buttons &&
        (buttons instanceof Array ? (
          buttons.map((button, index) => (
            <Button
              key={`button-${index}`}
              {...button}
              disabled={disabled || button.disabled}
            />
          ))
        ) : (
          <Button {...buttons} disabled={disabled || buttons.disabled} />
        ))}
    </Wrapper>
  );
};
