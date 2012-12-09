options(stringsAsFactors=FALSE)

library(ggplot2)
library(scales)

dat <- read.csv('slide5dat.csv')

for (this_year in dat$year) {
  this_dat <- dat[dat$year==this_year,]
  pp <- ggplot(subset(dat, year <= this_year), aes(mkt_share, cty_income/1e6, color=year)) + 
    geom_point(size=6) +
    geom_line(size=2.5) +
    annotate("text", x=this_dat$mkt_share, y=this_dat$cty_income/1e6, label=this_year,
             size=10, hjust=-.1, vjust=.5) +
    scale_x_continuous("Hog Packer Consolidation", 
                      limits=c(.3,.75), labels=percent) +
    scale_y_continuous("Rural County Income\n(millions)",
                       limits=c(20,40), labels=dollar) +
    scale_color_gradient("", limits=c(1981,2007), low="black", high="grey") +
    theme_bw() +
    theme(text=element_text(size=20), legend.position='none', 
          panel.grid=element_blank())
  ggsave(sprintf("slide5_%d.png", this_year), pp, width=5, height=4)

}

  


